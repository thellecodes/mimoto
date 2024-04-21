#![no_std]
use soroban_sdk::{contract, contractimpl, BigInt, Env, Symbol, Bytes};
use zksnark::groth16;
use zksnark::groth16::{Proof, SigmaG1, SigmaG2, QAP};
use zksnark::groth16::circuit::{ASTParser, TryParse};
use zksnark::groth16::fr::FrLocal;
use zksnark::groth16::coefficient_poly::CoefficientPoly;

#[contract]
pub struct ZKSnark;

#[contractimpl]
impl ZKSnark {
    pub fn verify_proof(env: Env, proof: Proof<SigmaG1, SigmaG2, FrLocal>, public_info: Vec<FrLocal>) -> bool {
        let code = &*::std::fs::read_to_string("test_programs/simple.zk").unwrap();
        let qap: QAP<CoefficientPoly<FrLocal>> = ASTParser::try_parse(code).unwrap().into();
        let (sigmag1, sigmag2) = groth16::setup(&qap);
        groth16::verify(&qap, (sigmag1, sigmag2), &public_info, proof)
    }

    pub fn create_proof(env: Env, input_assignments: Vec<FrLocal>) -> Bytes {
        let code = &*::std::fs::read_to_string("test_programs/simple.zk").unwrap();
        let qap: QAP<CoefficientPoly<FrLocal>> = ASTParser::try_parse(code).unwrap().into();
        let weights = groth16::weights(code, &input_assignments).unwrap();
        let (sigmag1, sigmag2) = groth16::setup(&qap);
        let proof = groth16::prove(&qap, (&sigmag1, &sigmag2), &weights);
        Bytes::from(proof.serialize())
    }
}
