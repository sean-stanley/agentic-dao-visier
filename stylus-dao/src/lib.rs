//! Stylus dao contract

// Allow `cargo stylus export-abi` to generate a main function.
#![cfg_attr(not(any(test, feature = "export-abi")), no_main)]
extern crate alloc;

use core::panic;

use alloc::{string::String, vec::Vec};
use alloy_primitives::{Uint, I64, U64};
/// Import items from the SDK. The prelude contains common traits and macros.
use stylus_sdk::{alloy_primitives::Address, block, call::RawCall, msg, prelude::*, storage::{StorageAddress, StorageBool, StorageBytes, StorageI64, StorageMap, StorageU64, StorageU8}};
// use hashbrown::HashMap as Map; // alternate map implementation than StorageMap. Prefer StorageMap for persistent storage.
use sha3::{Digest, Keccak256};


const MULTI_SIG_THRESHOLD: u8 = 3;

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
    // /// Stake governance tokens for voting (Tokens are locked until the voting period ends)
    pub fn stake_tokens(&mut self, amount: U64) {
        let sender = msg::sender();
        let current_balance = self.staked_balances.get(sender);
        if current_balance > Uint::from(0) {
            self.staked_balances.insert(sender, current_balance + amount);
        }
    }

    /// Submit a new proposal
    pub fn submit_proposal(
        &mut self,
        description: String,
        action_target: Address,
        action_payload: Vec<u8>,
    ) -> u64 {
        let proposal_id = self.proposal_count.get() + Uint::from(1);
        
        // hash the description for storage
        // might add to costs to execute this but that's just a tradeoff for security
        let description_hash = generate_hash(&description);
        let mut proposal = self.proposals.setter(proposal_id.to());
        proposal.proposer.set(msg::sender());
        proposal.description_hash.set_bytes(description_hash);
        proposal.expiry_timestamp.set(Uint::from(block::timestamp() + 604800)); // Example: 1 week from now
        proposal.action_target.set(action_target);
        proposal.action_payload.set_bytes(action_payload);
        proposal.ai_review_hash.set_bytes([0; 32]); // update later
        proposal.ai_risk_score.set(Uint::from(0)); // update later
        proposal.vote_yes.set(Uint::from(0));
        proposal.vote_no.set(Uint::from(0));
        proposal.executed.set(false);
        proposal.approvals.set(Uint::from(0));

        self.proposal_count.set(self.proposal_count.get() + Uint::from(1));
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
        if already_voted.get(voter).is_zero() {
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
    }
    
    
    /// Designate trusted signers for multi-sig execution
    pub fn add_signer(&mut self, signer: Address) {
        if self.signers.get(signer).is_empty() {
            self.signers.insert(signer, signer);
        } else {
            panic!("Signer already exists.");
        }
    }

    /// Approve a proposal execution (Only signers can call this)
    pub fn approve_execution(&mut self, proposal_id: u64) {
        let signer = msg::sender();
        if self.signers.get(signer).is_empty() {
            panic!("Only designated signers can approve execution.");
        }

        // remove instead of get lets us take ownership of the proposal
        let mut proposal = self.proposals.setter(proposal_id);

        // Prevent double approvals
        let mut approvals = self.signer_approvals.setter(proposal_id);

        if approvals.get(signer) {
            panic!("Signer has already approved this proposal.");
        }

        approvals.insert(signer, true);
        let current_approval_count = proposal.approvals.get();
        proposal.approvals.set(current_approval_count + Uint::from(1));
        

        let total_approvals = proposal.approvals.get();

        // If enough signers approve, execute the proposal
        if total_approvals >= Uint::from(MULTI_SIG_THRESHOLD) {
            self.execute_proposal(proposal_id);
        }
    }

    /// Execute a proposal if it meets all conditions
    pub fn execute_proposal(&mut self, proposal_id: u64) {
        let mut proposal = self.proposals.setter(proposal_id);

        // Ensure the proposal is still valid
        if block::timestamp() > proposal.expiry_timestamp.get().to() {
            panic!("Proposal has expired.");
        }

        // Ensure AI review didn't flag it as too risky
        if proposal.ai_risk_score.get().to::<u8>() > 75 {
            panic!("Proposal flagged as too risky.");
        }

        // Ensure it passed voting
        if proposal.vote_yes.get() <= proposal.vote_no.get() {
            panic!("Proposal did not pass.");
        }

        // Ensure multi-sig approval threshold is met
        if proposal.approvals.get().to::<u8>() < 3 {
            panic!("Proposal needs at least 3 multi-sig approvals.");
        }

        // Execute the function call
        RawCall::new_delegate()   // configure a delegate call
            .gas(2100)                       // supply 2100 gas
            .skip_return_data()             // skip reading return data 
            .call(proposal.action_target.get(), proposal.action_payload.get_bytes().as_ref()).expect("proposal call failed");

        proposal.executed.set(true);
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

    // test contract deployment
    #[motsu::test]
    fn test_deploy() {
        let mut contract = DAO::new();
        assert_eq!(contract.proposal_count.get(), 0);
    }
}