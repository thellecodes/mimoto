#![no_std]
use soroban_sdk::{contract, contractimpl, BigInt, Env, Symbol, Bytes, Address};

#[contract]
pub struct MimotoPayment;

#[contractimpl]
impl MimotoPayment {
    pub fn pay(env: Env, from: Symbol, to: Symbol, amount: BigInt) {
        let from_balance = env.storage().get::<BigInt>(&from).unwrap_or_default();
        if from_balance < amount {
            panic!("Insufficient funds");
        }

        env.storage().set(&from, &(from_balance - &amount));
        let to_balance = env.storage().get::<BigInt>(&to).unwrap_or_default();
        env.storage().set(&to, &(to_balance + &amount));

        env.emit(&PaymentEvent {
            from,
            to,
            amount: amount.clone(),
        });
    }

    pub fn get_balance(env: Env, account: Symbol) -> BigInt {
        env.storage().get::<BigInt>(&account).unwrap_or_default()
    }

    pub fn add_funds(env: Env, account: Symbol, amount: BigInt) {
        let current_balance = env.storage().get::<BigInt>(&account).unwrap_or_default();
        env.storage().set(&account, &(current_balance + &amount));
    }

    pub fn withdraw(env: Env, account: Symbol, amount: BigInt) {
        let current_balance = env.storage().get::<BigInt>(&account).unwrap_or_default();
        if current_balance < amount {
            panic!("Insufficient funds for withdrawal");
        }
        env.storage().set(&account, &(current_balance - &amount));
    }
}

#[derive(contracttype)]
pub struct PaymentEvent {
    pub from: Symbol,
    pub to: Symbol,
    pub amount: BigInt,
}

#[derive(contracttype)]
pub struct AddFundsEvent {
    pub account: Symbol,
    pub amount: BigInt,
}

#[derive(contracttype)]
pub struct WithdrawEvent {
    pub account: Symbol,
    pub amount: BigInt,
}
