#![no_std]
#![no_main]

// Allow `cargo stylus export-abi` to generate a main function.
#![cfg_attr(not(any(test, feature = "export-abi")), no_main)]
extern crate alloc;

use alloc::{string::String, vec::Vec};
use alloy_primitives::{Uint, U64};
/// Import items from the SDK. The prelude contains common traits and macros.
use stylus_sdk::{alloy_primitives::Address, msg, prelude::*, storage::{StorageAddress, StorageBool, StorageBytes, StorageMap, StorageU64, StorageU8, StorageUint, StorageVec}};
// use hashbrown::HashMap as Map; // alternate map implementation than StorageMap. Prefer StorageMap for persistent storage.
use sha3::{Digest, Keccak256};


#[entrypoint]
#[storage]
pub struct DAO {
    proposals: StorageMap<u64, Proposal>,
    proposal_count: StorageU64,
    governance_token: StorageAddress,
    staked_balances: StorageMap<Address, StorageU64>,
    vote_records: StorageMap<u64, StorageMap<Address, StorageU64>>,
    locked_stakes: StorageMap<Address, StorageU64>,
    signers: StorageVec<StorageAddress>,  // Multi-sig signers
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
        let proposal_id = self.proposal_count;
        
        // hash the description for storage
        // might add to costs to execute this but that's just a tradeoff for security
        let description_hash = generate_hash(&description);
        
        self.proposals.insert(
            proposal_id,
            Proposal {
                proposer: msg::sender(),
                description_hash,
                expiry_timestamp: msg::block_timestamp() + 604800, // Example: 1 week from now
                action_target,
                action_payload,
                ai_review_hash: [0; 32].into(), // update later
                ai_risk_score: 0, // update later
                vote_yes: 0,
                vote_no: Uint::<64, 1>::from(0),
                executed: StorageBool::from(false),
                approvals: 0,
            },
        );
        self.proposal_count += 1;
        proposal_id
    }

    /// Quadratic Voting - Each voter can vote only once per proposal
    pub fn vote(&mut self, proposal_id: u64, approve: bool) {
        let voter = msg::sender();
        let staked_tokens = self.staked_balances.get(voter).unwrap_or(0);

        // Prevent users from voting twice on the same proposal
        let already_voted = self.vote_records.get(proposal_id).unwrap_or_default();
        if already_voted.contains_key(&voter) {
            panic!("Voter has already voted on this proposal");
        }

        // Apply quadratic voting formula
        let vote_power = sqrt(staked_tokens);
        let mut proposal = self.proposals.get(proposal_id);

        if approve {
            proposal.vote_yes += vote_power;
        } else {
            proposal.vote_no += vote_power;
        }

        // Record the vote
        let mut votes = self.vote_records.get(proposal_id).unwrap_or_default();
        votes.insert(voter, vote_power);
        self.vote_records.insert(proposal_id, votes);

        // Lock the staked tokens for this voter until the voting period ends
        self.locked_stakes.insert(voter, staked_tokens);
        self.proposals.insert(proposal_id, proposal);
    }
    
    
    /// Designate trusted signers for multi-sig execution
    pub fn add_signer(&mut self, signer: Address) {
        if !self.signers.contains(&signer) {
            self.signers.push(signer);
        }
    }

    /// Approve a proposal execution (Only signers can call this)
    pub fn approve_execution(&mut self, proposal_id: u64) {
        let signer = msg::sender();
        if !self.signers.contains(&signer) {
            panic!("Only designated signers can approve execution.");
        }

        // remove instead of get lets us take ownership of the proposal
        let mut proposal = self.proposals.get(proposal_id);

        // Prevent double approvals
        let mut approvals = self.signer_approvals.get(proposal_id);
        if approvals.contains_key(&signer) {
            // remember to re-insert the proposal
            self.proposals.insert(proposal_id, proposal);
            panic!("Signer has already approved this proposal.");
        }

        approvals.insert(signer, true);
        self.signer_approvals.insert(proposal_id, approvals);
        proposal.approvals.set(proposal.approvals + StorageUint::from(1));
        

        let total_approvals: Uint<8, 1> = proposal.approvals.into();

        // If enough signers approve, execute the proposal
        if total_approvals >= Uint::from(3) {
            self.execute_proposal(proposal_id);
        }

        // we re-insert the modified proposal
        self.proposals.insert(proposal_id, proposal);
    }

    /// Execute a proposal if it meets all conditions
    pub fn execute_proposal(&mut self, proposal_id: u64) {
        let mut proposal = self.proposals.get(proposal_id).unwrap();

        // Ensure the proposal is still valid
        // TODO: fix this with another function that finds the current timestamp
        if msg::block_timestamp() > proposal.expiry_timestamp {
            panic!("Proposal has expired.");
        }

        // Ensure AI review didn't flag it as too risky
        if proposal.ai_risk_score > 75 {
            panic!("Proposal flagged as too risky.");
        }

        // Ensure it passed voting
        if proposal.vote_yes <= proposal.vote_no {
            panic!("Proposal did not pass.");
        }

        // Ensure multi-sig approval threshold is met
        if proposal.approvals < 3 {
            panic!("Proposal needs at least 3 multi-sig approvals.");
        }

        // Execute the function call

        msg::call_raw(proposal.action_target, &proposal.action_payload);

        proposal.executed = true;
        self.proposals.insert(proposal_id, proposal);
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