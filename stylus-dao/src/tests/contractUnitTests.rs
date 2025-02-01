#![cfg(test)]
extern crate std;
use std::vec;
use stylus_sdk::alloy_primitives::Address;
use stylus_sdk::prelude::*;
use crate::*;

#[test]
fn test_stake_tokens() {
    let mut dao = DAO::default();
    let user = Address::repeat_byte(1);
    msg::set_sender(user);
    
    dao.stake_tokens(U64::from(100));
    assert_eq!(dao.staked_balances.get(user), U64::from(100));
}


