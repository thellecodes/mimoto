![Mimoto26](https://github.com/nkoorty/Mimoto/assets/80065244/5c12675d-3ba1-4641-a4f4-ec77ee8ef588)
# Mimoto
Mimoto combines a Zero-Knowledge (ZK) proof Rust crate with a user-friendly payment platform to ensure privacy, security, and ease — both built on Soroban. The crate allows for secure validation of user data, ensuring privacy in transactions and is going to be open-sourced, enabling other Stellar/Soroban projects to incorporate KYC/AML-compliant, private data verification into their workflows. Users can upload and manage their credentials, creating ZK proofs that interface smoothly with Mimoto’s smart contracts, thereby maintaining confidentiality while adhering to compliance requirements.

## Repository Breakdown
### Smart Contracts
Contains all Soroban smart contract code, including the logic for token transactions, user authorization, and other contract-based operations essential to Mimoto's functionality.

### Frontend
Holds the source code for the web-based frontend interface, built with Next.js, providing users with a sleek and responsive platform to manage their digital payments. To run the frontend, run

    npm i
    npm run dev

Аnd find the frontend under `localhost:3000`.

### REST API
The REST API, created with Flask, is the communication layer that connects the frontend to the smart contracts and Firestore database, handling requests and business logic.

### Chromium Extension
Comprises the code for the Chromium-based browser extension, which allows users to interact with Mimoto features directly within their web browsers on social media sites.

### Discord Bot
Includes the implementation of the Mimoto Discord bot, enabling users within Discord servers to easily send and receive payments and view transaction links.
