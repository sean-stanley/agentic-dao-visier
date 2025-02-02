// #![cfg(test)]
// extern crate std;
// use std::vec;
// use stylus_sdk::alloy_primitives::Address;
// use stylus_sdk::prelude::*;

// #[test]
// fn test_stake_tokens() {
//     let mut dao = DAO::default();
//     let user = Address::repeat_byte(1);
//     msg::set_sender(user);
    
//     dao.stake_tokens(U64::from(100));
//     assert_eq!(dao.staked_balances.get(user), U64::from(100));
// }

// #[test]
// fn test_submit_proposal() {
//     let mut dao = DAO::default();
//     let user = Address::repeat_byte(1);
//     msg::set_sender(user);
    
//     let proposal_id = dao.submit_proposal("Test Proposal".to_string(), Address::repeat_byte(2), vec![0x01, 0x02]);
//     assert_eq!(proposal_id, 1);
//     assert_eq!(dao.proposal_count.get(), U64::from(1));
//     assert_eq!(dao.proposals.get(proposal_id).proposer.get(), user);
// }

// #[test]
// fn test_vote() {
//     let mut dao = DAO::default();
//     let user = Address::repeat_byte(1);
//     msg::set_sender(user);
    
//     dao.stake_tokens(U64::from(100));
//     let proposal_id = dao.submit_proposal("Test Proposal".to_string(), Address::repeat_byte(2), vec![0x01, 0x02]);
    
//     dao.vote(proposal_id, true);
//     assert!(dao.vote_records.get(proposal_id).get(user) > I64::from(0));
//     assert!(dao.proposals.get(proposal_id).vote_yes.get() > U64::from(0));
// }
