//! erc20 DAO token contract

//imports
use stylus::prelude::*;

#[stylus::contract]
mod erc20 {
    struct ERC20 {
        total_supply: U256,
        balances: Map<Address, U256>,
        allowances: Map<(Address, Address), U256>,
    }

        // Constructor for the contract to initialize it with an initial supply
        #[constructor]
        fn new(initial_supply: U256) -> ERC20 {
            let mut balances = Map::new();
            let sender = env::caller();
    
            // Assign the initial supply to the caller's balance
            balances.insert(sender, initial_supply);
    
            ERC20 {
                total_supply: initial_supply,
                balances,
                allowances: Map::new(),
            }
        }
}