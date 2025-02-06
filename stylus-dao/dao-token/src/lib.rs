#![cfg_attr(not(any(feature = "export-abi", test)), no_main)]
extern crate alloc;

use alloc::string::String;
use alloy_primitives::{Address, U256};
use alloy_sol_types::{sol_data::{Address as SOLAddress, String as SOLString, Bytes as SOLBytes, Uint as SOLUint}, sol, SolType};
use core::marker::PhantomData;
use stylus_sdk::{
    evm, function_selector, msg, abi::Bytes, prelude::*

};

pub trait Erc20Params {
    const NAME: &'static str;
    const SYMBOL: &'static str;
    const DECIMALS: u8;
}

sol_storage! {
    pub struct Erc20<T> {
        mapping(address => uint256) balances;
        mapping(address => mapping(address => uint256)) allowances;
        uint256 total_supply;
        PhantomData<T> phantom;
    }
}

// defining events and errors
sol! {
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    error InsufficientBalance(address from, uint256 have, uint256 want);
    error InsufficientAllowance(address owner, address spender, uint256 have, uint256 want);
}

#[derive(SolidityError)]
pub enum Erc20Error {
    InsufficientBalance(InsufficientBalance),
    InsufficientAllowance(InsufficientAllowance),
}

impl<T: Erc20Params> Erc20<T> {
    pub fn _transfer(&mut self, from: Address, to: Address, value: U256) -> Result<(), Erc20Error> {
        let mut sender_balance = self.balances.setter(from);
        let old_sender_balance = sender_balance.get();
        if old_sender_balance < value {
            return Err(Erc20Error::InsufficientBalance(InsufficientBalance { from, have: old_sender_balance, want: value }));
        }
        sender_balance.set(old_sender_balance - value);
        let mut to_balance = self.balances.setter(to);
        let current_balance = to_balance.get(); // Immutable borrow
        to_balance.set(current_balance + value); // Mutable borrow occurs later

        evm::log(Transfer { from, to, value });
        Ok(())
    }

    pub fn mint(&mut self, address: Address, value: U256) -> Result<(), Erc20Error> {
        let mut balance = self.balances.setter(address);
        let balance_new = balance.get();
        balance.set(balance_new + value);
        self.total_supply.set(self.total_supply.get() + value);
        evm::log(Transfer { from: Address::ZERO, to: address, value });
        Ok(())
    }

    pub fn burn(&mut self, address: Address, value: U256) -> Result<(), Erc20Error> {
        let mut balance = self.balances.setter(address);
        let old_balance = balance.get();
        if old_balance < value {
            return Err(Erc20Error::InsufficientBalance(InsufficientBalance { from: address, have: old_balance, want: value }));
        }
        balance.set(old_balance - value);
        self.total_supply.set(self.total_supply.get() - value);
        evm::log(Transfer { from: address, to: Address::ZERO, value });
        Ok(())
    }
}

#[public]
impl<T: Erc20Params> Erc20<T> {
    pub fn name() -> String { T::NAME.into() }
    pub fn symbol() -> String { T::SYMBOL.into() }
    pub fn decimals() -> u8 { T::DECIMALS }
    pub fn total_supply(&self) -> U256 { self.total_supply.get() }
    pub fn balance_of(&self, owner: Address) -> U256 { self.balances.get(owner) }

    pub fn transfer(&mut self, to: Address, value: U256) -> Result<bool, Erc20Error> {
        self._transfer(msg::sender(), to, value)?;
        Ok(true)
    }

    pub fn transfer_from(&mut self, from: Address, to: Address, value: U256) -> Result<bool, Erc20Error> {
        let mut sender_allowances = self.allowances.setter(from);
        let mut allowance = sender_allowances.setter(msg::sender());
        let old_allowance = allowance.get();
        if old_allowance < value {
            return Err(Erc20Error::InsufficientAllowance(InsufficientAllowance { owner: from, spender: msg::sender(), have: old_allowance, want: value }));
        }
        allowance.set(old_allowance - value);
        self._transfer(from, to, value)?;
        Ok(true)
    }

    pub fn approve(&mut self, spender: Address, value: U256) -> bool {
        self.allowances.setter(msg::sender()).insert(spender, value);
        evm::log(Approval { owner: msg::sender(), spender, value });
        true
    }

    pub fn allowance(&self, owner: Address, spender: Address) -> U256 {
        self.allowances.getter(owner).get(spender)
    }
}

struct StylusTokenParams;
impl Erc20Params for StylusTokenParams {
    const NAME: &'static str = "Agentic Dao";
    const SYMBOL: &'static str = "DAO";
    const DECIMALS: u8 = 18;
}

sol_storage! {
    #[entrypoint]
    struct StylusToken {
        #[borrow]
        Erc20<StylusTokenParams> erc20;
        address owner;
    }
}

/// Function selector for `mint(address,uint256)`
const MINT_SELECTOR: [u8; 4] = function_selector!("mint(address,uint256)");

#[public]
#[inherit(Erc20<StylusTokenParams>)]
impl StylusToken {

    /// Initialize owner on contract deployment
    pub fn init(&mut self) {
        self.owner.set(msg::sender());
    }

    /// Modifier to check if the caller is the owner
    fn only_owner(&self) -> Result<(), Erc20Error> {
        if msg::sender() != self.owner.get() {
            return Err(Erc20Error::InsufficientBalance(InsufficientBalance {
                from: msg::sender(),
                have: U256::from(0),
                want: U256::from(0),
            }));
        }
        Ok(())
    }

    #[payable]
    pub fn receive_eth_and_mint(&mut self, calldata: Bytes) -> Result<(), Vec<u8>> {
        let selector = &calldata[..4]; // Extract function selector

        if selector == MINT_SELECTOR.as_slice() {

            type TxIdHashType = (SOLAddress, SOLUint<256>);

            let tx_hash_data = &calldata[4..]; // Extract the data after the selector

            // Decode the TxIdHashType data from the calldata (after the first 4 bytes for the selector)
            let (to, amount) = match TxIdHashType::abi_decode_sequence(tx_hash_data, true) {
                Ok((to, amount)) => (to, amount),
                Err(_) => return Err(b"Invalid calldata".to_vec()),
            };

            // Call mint function
            self.mint_to(to, amount)?;

            Ok(())
        } else {
            Err(b"Invalid function call".to_vec())
        }
    }

    /// Mint tokens (only owner)
    pub fn mint(&mut self, value: U256) -> Result<(), Erc20Error> {
        self.only_owner()?;  // Check if sender is owner
        self.erc20.mint(msg::sender(), value)?;
        Ok(())
    }

    /// Mint tokens to specific address (only owner)
    pub fn mint_to(&mut self, to: Address, value: U256) -> Result<(), Erc20Error> {
        self.only_owner()?;  // Check if sender is owner
        self.erc20.mint(to, value)?;
        Ok(())
    }

    /// Burn tokens
    pub fn burn(&mut self, value: U256) -> Result<(), Erc20Error> {
        self.erc20.burn(msg::sender(), value)?;
        Ok(())
    }

    /// Change owner (only owner)
    pub fn set_owner(&mut self, new_owner: Address) -> Result<(), Erc20Error> {
        self.only_owner()?;  // Check if sender is owner
        self.owner.set(new_owner);
        Ok(())
    }

    /// Get the current owner
    pub fn get_owner(&self) -> Address {
        self.owner.get()
    }
}

