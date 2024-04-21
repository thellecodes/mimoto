#![no_std]
use soroban_sdk::{contract, contractimpl, BigInt, Bytes, Env, Symbol};
use sha256::digest;

#[contract]
pub struct AddressBook;

#[contractimpl]
impl AddressBook {
    pub fn add_user(env: Env, user_id: Symbol, stellar_address: Bytes, secret: Option<Symbol>) {
        let hash_key = self.generate_hash_key(&user_id, &secret);
        env.storage().set(&Bytes::from(hash_key.as_bytes()), &stellar_address);
    }

    pub fn get_address(env: Env, user_id: Symbol, secret: Option<Symbol>) -> Bytes {
        let hash_key = self.generate_hash_key(&user_id, &secret);
        env.storage().get::<Bytes>(&Bytes::from(hash_key.as_bytes())).unwrap_or_default()
    }

    pub fn remove_user(env: Env, user_id: Symbol, secret: Option<Symbol>) {
        let hash_key = self.generate_hash_key(&user_id, &secret);
        env.storage().remove(&Bytes::from(hash_key.as_bytes()));
    }

    pub fn update_user(env: Env, user_id: Symbol, new_address: Bytes, secret: Option<Symbol>) {
        let hash_key = self.generate_hash_key(&user_id, &secret);
        env.storage().set(&Bytes::from(hash_key.as_bytes()), &new_address);
    }

    fn generate_hash_key(user_id: &Symbol, secret: &Option<Symbol>) -> String {
        let user_id_str = String::from_utf8_lossy(user_id.to_bytes().as_slice());
        let secret_str = secret.as_ref().map_or(String::new(), |s| String::from_utf8_lossy(s.to_bytes().as_slice()).to_string());
        let combined = format!("{}{}", user_id_str, secret_str);
        digest(&combined)
    }
}
