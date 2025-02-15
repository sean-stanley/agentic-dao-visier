//! Stylus dao contract

// Allow `cargo stylus export-abi` to generate a main function.
#![cfg_attr(not(any(test, feature = "export-abi")), no_main)]
extern crate alloc;

use core::panic;

use alloc::{string::String, vec::Vec};
use alloy_primitives::U8;
/// Import items from the SDK. The prelude contains common traits and macros.
use stylus_sdk::{alloy_primitives::{Address, FixedBytes, Uint, I64, U256, U64}, alloy_sol_types::sol, block, call::{Call, RawCall}, evm, msg, prelude::*, storage::{StorageAddress, StorageBool, StorageBytes, StorageI64, StorageMap, StorageU64, StorageU8}};

// use hashbrown::HashMap as Map; // alternate map implementation than StorageMap. Prefer StorageMap for persistent storage.
use sha3::{Digest, Keccak256};

const MULTI_SIG_THRESHOLD: u8 = 3;

// defining events and errors
sol! {
    event TokensStaked(address indexed sender, uint256 amount);
    event ProposalSubmitted(address indexed proposer, uint64 proposal_id, bytes32 descriptionHash, string description, uint64 vote_yes, uint64 vote_no , uint8 ai_risk_score, uint64 expiryTimestamp);
    event VoteCast(address indexed voter, uint64 proposal_id, bool approve, uint256 power);
    event SignerAdded(address indexed signer);
    event ProposalApproved(address indexed signer, uint64 proposal_id);
    event ProposalExecuted(uint64 proposal_id, address target);
    event MintingSuccess(address indexed to, uint256 value);
    event ProposalAIUpdated(uint64 proposal_id, bytes32 ai_review_hash, uint8 score);

    error NotOwner();
}

sol_interface! {
    interface IStylusToken {
        function init() external;

        function onlyOwner() external view;

        function mint(uint256 value) external;

        function mintTo(address to, uint256 value) external;

        function burn(uint256 value) external;

        function transfer(address to, uint256 value) external returns (bool);

        function setOwner(address new_owner) external;

        function getOwner() external view returns (address);
    }
}

#[entrypoint]
#[storage]
pub struct DAO {
    proposals: StorageMap<u64, Proposal>,
    proposal_count: StorageU64,
    governance_token: StorageAddress,
    staked_balances: StorageMap<Address, StorageU64>,
    vote_records: StorageMap<u64, StorageMap<Address, StorageI64>>,
    locked_stakes: StorageMap<Address, StorageU64>,
    signers: StorageMap<Address, StorageAddress>,  // Multi-sig signers
    signer_approvals: StorageMap<u64, StorageMap<Address, StorageBool>>,  // Proposal ID -> (Signer -> Approved)
    owner: StorageAddress,
}


#[storage]
pub struct Proposal {
    pub proposer: StorageAddress,
    pub description_hash: StorageBytes, // [u8; 32],
    pub expiry_timestamp: StorageU64,
    pub action_target: StorageAddress,
    pub action_payload: StorageBytes,
    pub ai_review_hash: StorageBytes, // [u8; 32],
    pub ai_risk_score: StorageU8,
    pub vote_yes: StorageU64,
    pub vote_no: StorageU64,
    pub executed: StorageBool,
    pub approvals: StorageU8,  // Number of multi-sig approvals
}

/// Multi-sig verification: Requires at least 3 signers to approve before execution
#[public]
impl DAO {
    pub fn token_address(&self) -> Address {
        self.governance_token.get()
    }

    /// Initialize the DAO contract with token contract address and owner
    pub fn init(&mut self, token_address: Address) {
        self.owner.set(msg::sender());
        self.governance_token.set(token_address);
    }

    /// Modifier to ensure that only the owner can call certain functions
    fn only_owner(&self) {
        if msg::sender() != self.owner.get() {
            panic!("Not the owner");
        }
    }

    /// Mint governance tokens to a specific address through the token contract
    pub fn mint_to(&mut self, to: Address, amount: U256) -> Result<(), Vec<u8>> {
        let token_address = self.governance_token.get();  // Retrieve stored token contract address
        let token_contract = IStylusToken::from(token_address);  // Create an instance from the address
    
        let config = Call::new_in(self)  // Configure the call
            .gas(evm::gas_left() / 2);   // Use half of the remaining gas
    
        token_contract.mint_to(config, to, amount)?; // Call mint function

        evm::log(MintingSuccess {
            to,
            value: amount.to(),
        });
    
        Ok(())
    }

    // /// Stake governance tokens for voting (Tokens are locked until the voting period ends)
    pub fn stake_tokens(&mut self, amount: U64) {
        let sender = msg::sender();
        let current_balance = self.staked_balances.get(sender);
        if current_balance > Uint::from(0) {
            self.staked_balances.insert(sender, current_balance + amount);
        } else {
            self.staked_balances.insert(sender, amount);
        }

        // emit event
        evm::log(TokensStaked {
            sender,
            amount: amount.to(),
        });
    }

    /// Submit a new proposal
    pub fn submit_proposal(
        &mut self,
        description: String,
        yes_votes: U64, 
        no_votes: U64, 
        ai_risk_score: U8,
    ) -> u64 {
        let proposal_id = self.proposal_count.get() + Uint::from(1);
        
        // hash the description for storage
        // might add to costs to execute this but that's just a tradeoff for security
        let description_hash = generate_hash(&description);
        let mut proposal = self.proposals.setter(proposal_id.to());
        proposal.proposer.set(msg::sender());

        // this hash is stored
        proposal.description_hash.set_bytes(description_hash);

        // this hash is emitted
        let fixed_description_hash = FixedBytes::<32>::from(description_hash);

        proposal.expiry_timestamp.set(Uint::from(block::timestamp() + 604800)); // Example: 1 week from now

        proposal.ai_review_hash.set_bytes([0; 1]); // update later to full 32 bytes
        proposal.ai_risk_score.set(Uint::from(0)); // update later
        proposal.vote_yes.set(yes_votes);
        proposal.vote_no.set(no_votes);
        proposal.executed.set(false);
        proposal.approvals.set(Uint::from(0));

        self.proposal_count.set(self.proposal_count.get() + Uint::from(1));

        // emit event
        evm::log(ProposalSubmitted {
            proposal_id: proposal_id.to(),
            proposer: msg::sender(),
            descriptionHash: fixed_description_hash,
            vote_yes: yes_votes.to(),
            vote_no: no_votes.to(),
            ai_risk_score: ai_risk_score.to(),
            description: description,
            expiryTimestamp: proposal.expiry_timestamp.get().to(),
        });
                
        proposal_id.to()
    }

    /// Quadratic Voting - Each voter can vote only once per proposal
    pub fn vote(&mut self, proposal_id: u64, approve: bool) {
        let voter = msg::sender();
        let staked_tokens = self.staked_balances.get(voter);

        if staked_tokens == Uint::from(0) {
            panic!("Voter has no staked tokens.");
        }

        // Prevent users from voting twice on the same proposal
        let mut already_voted = self.vote_records.setter(proposal_id);
        if already_voted.get(voter).is_positive() {
            panic!("Voter has already voted on this proposal");
        }

        // Apply quadratic voting formula
        let vote_power = Uint::from(sqrt(staked_tokens.to()));
        let mut proposal = self.proposals.setter(proposal_id);
        let yes_votes = proposal.vote_yes.get();
        let no_voites = proposal.vote_no.get();

        if approve {
            proposal.vote_yes.set(yes_votes + vote_power);
        } else {
            proposal.vote_no.set(no_voites + vote_power);
        }

        // Record the vote
        let vote_signed = if approve { I64::unchecked_from(vote_power.to::<i64>()) } else { I64::unchecked_from(-vote_power.to::<i64>()) };
        already_voted.insert(voter, vote_signed);        

        // Lock the staked tokens for this voter until the voting period ends
        // TODO: fix this with another function that actually transfers the funds to the contract's wallet
        self.locked_stakes.insert(voter, staked_tokens);

        // Emit VoteCast event
        evm::log(VoteCast {
            voter,
            proposal_id,
            approve,
            power: vote_power.to(),
        });
    }
    
    
    /// Designate trusted signers for multi-sig execution
    pub fn add_signer(&mut self, signer: Address) {
        self.signers.insert(signer, signer);

        // Emit SignerAdded event
        evm::log(SignerAdded {
            signer,
        });
    }

    // commented out to save gas costs
    
    // /// Approve a proposal execution (Only signers can call this)
    // pub fn approve_execution(&mut self, proposal_id: u64) {
    //     let signer = msg::sender();
    //     if self.signers.get(signer).is_empty() {
    //         panic!("Only designated signers can approve execution.");
    //     }

    //     // remove instead of get lets us take ownership of the proposal
    //     let mut proposal = self.proposals.setter(proposal_id);

    //     // Prevent double approvals
    //     let mut approvals = self.signer_approvals.setter(proposal_id);

    //     if approvals.get(signer) {
    //         panic!("Signer has already approved this proposal.");
    //     }

    //     approvals.insert(signer, true);
    //     let current_approval_count = proposal.approvals.get();
    //     proposal.approvals.set(current_approval_count + Uint::from(1));
        
    //     // Emit ProposalApproved event
    //     evm::log(ProposalApproved {
    //         signer,
    //         proposal_id,
    //     });

    //     let total_approvals = proposal.approvals.get();

    //     // If enough signers approve, execute the proposal
    //     if total_approvals >= Uint::from(MULTI_SIG_THRESHOLD) {
    //         self.execute_proposal(proposal_id);
    //     }
    // }

    // /// Execute a proposal if it meets all conditions
    // pub fn execute_proposal(&mut self, proposal_id: u64) {
    //     let mut proposal = self.proposals.setter(proposal_id);

    //     // Ensure the proposal is still valid
    //     if block::timestamp() > proposal.expiry_timestamp.get().to() {
    //         panic!("Proposal has expired.");
    //     }

    //     // Ensure AI review didn't flag it as too risky
    //     if proposal.ai_risk_score.get().to::<u8>() > 75 {
    //         panic!("Proposal flagged as too risky.");
    //     }

    //     // Ensure it passed voting
    //     if proposal.vote_yes.get() <= proposal.vote_no.get() {
    //         panic!("Proposal did not pass.");
    //     }

    //     // Ensure multi-sig approval threshold is met
    //     if proposal.approvals.get().to::<u8>() < 3 {
    //         panic!("Proposal needs at least 3 multi-sig approvals.");
    //     }

    //     // Execute the function call
    //     RawCall::new_delegate()   // configure a delegate call
    //         .gas(2100)                       // supply 2100 gas
    //         .skip_return_data()             // skip reading return data 
    //         .call(proposal.action_target.get(), proposal.action_payload.get_bytes().as_ref()).expect("proposal call failed");

    //     proposal.executed.set(true);

    //     // Emit ProposalExecuted event
    //     evm::log(ProposalExecuted {
    //         proposal_id,
    //         target: proposal.action_target.get(),
    //     });
    // }

    /// Update a proposal with an AI review hash (Only once)
    pub fn update_proposal_with_ai_review(&mut self, proposal_id: u64, ai_review_hash: [u8; 32], score: u8) {
        let mut proposal = self.proposals.setter(proposal_id);

        // Ensure the AI review hasn't already been set
        if proposal.ai_review_hash.len() > 1 {
            panic!("AI review hash already set for this proposal.");
        }

        // Validate hash format (must be exactly 32 bytes)
        if ai_review_hash.len() != 32 {
            panic!("Invalid AI review hash. Must be a Keccak256 hash.");
        }

        // Store the AI review hash
        proposal.ai_review_hash.set_bytes(ai_review_hash);
        proposal.ai_risk_score.set(Uint::from(score));

        // Emit AI review event
        // evm::log(ProposalAIUpdated {
        //     proposal_id,
        //     ai_review_hash: FixedBytes::<32>::from(ai_review_hash),
        //     score,
        // });
    }

    /// Verify an AI review against the stored hash
    pub fn verify_ai_review(&self, proposal_id: u64, provided_hash: [u8; 32]) -> bool {
        let proposal = self.proposals.get(proposal_id);

        return proposal.ai_review_hash.get_bytes() == provided_hash;
    }

    /// Set target address for governance token
    pub fn set_governance_token(&mut self, token_address: Address) {
        self.governance_token.set(token_address);
    }
}

/// Square root function for quadratic voting
fn sqrt(n: u64) -> u64 {
    let mut x = n;
    let mut y = (x + 1) / 2;
    while y < x {
        x = y;
        y = (x + n / x) / 2;
    }
    x
}


fn generate_hash(text: &str) -> [u8; 32] {
    let mut hasher = Keccak256::new();
    hasher.update(text);
    let result = hasher.finalize();
    let mut hash_array = [0u8; 32];
    hash_array.copy_from_slice(&result[..32]);
    hash_array
}

#[cfg(test)]
mod tests {
    use super::*;

    // test the sqrt function
    #[test]
    fn test_sqrt() {
        assert_eq!(sqrt(16), 4);
        assert_eq!(sqrt(25), 5);
        assert_eq!(sqrt(100), 10);
    }

    // test the hash function
    #[test]
    fn test_hash() {
        let text = "Hello, world!";
        let hash = generate_hash(text);
        assert_eq!(hash.len(), 32);
    }

    // test stake tokens
    #[motsu::test]
    fn it_stakes_tokens(contract: DAO) {
        // display sender address
        println!("Sender: {:?}", msg::sender());
        contract.stake_tokens(U64::from(100));
        assert_eq!(contract.staked_balances.get(msg::sender()), U64::from(100));
    }

    // test submit proposal
    #[motsu::test]
    fn it_submits_proposal(contract: DAO) {
        let proposal_id = contract.submit_proposal("Test Proposal".to_string(), U64::from(0), U64::from(0), U8::from(0));
        let proposal = contract.proposals.get(proposal_id);
        assert_eq!(proposal.proposer.get(), msg::sender());
    }

    // test vote
    #[motsu::test]
    fn it_votes(contract: DAO) {
        contract.stake_tokens(U64::from(100));
        let proposal_id = contract.submit_proposal("Test Proposal".to_string(), U64::from(0), U64::from(0), U8::from(0));
        contract.vote(proposal_id, true);
        let proposal = contract.proposals.get(proposal_id);
        assert_eq!(proposal.vote_yes.get(), U64::from(10));
    }

    // test add signer
    #[motsu::test]
    fn it_adds_signer(contract: DAO) {
        contract.add_signer(msg::sender());
        assert_eq!(contract.signers.get(msg::sender()), msg::sender());
    }
}