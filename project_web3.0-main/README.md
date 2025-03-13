# CryptoVault - Secure DeFi Platform

A decentralized finance platform for secure token staking and vault management.

## ⚠️ Security Notice

This repository contains sensitive configurations. Before deploying or sharing:

1. NEVER commit `.env` files
2. NEVER share private keys
3. NEVER commit real API keys or URLs
4. Use `.env.example` files as templates
5. Keep contract addresses private unless deployed to public networks

## Environment Variables

### Client (.env)
```bash
# Required
VITE_VAULT_CONTRACT_ADDRESS=   # Your deployed vault contract address
VITE_TOKEN_CONTRACT_ADDRESS=   # Your deployed token contract address

# Optional
VITE_CHAIN_ID=                 # Network chain ID
VITE_NETWORK_NAME=             # Network name
```

### Smart Contract (.env)
```bash
# Required
PRIVATE_KEY=                   # Your wallet private key
ETHERSCAN_API_KEY=            # For contract verification
ALCHEMY_API_KEY=              # Your Alchemy API key

# Optional
OWNER_ADDRESS=                # Contract owner address
INITIAL_TOKEN_SUPPLY=         # Initial token supply
```

## Features

- Secure ETH vault system
- Token staking with rewards
- Portfolio management
- Real-time transaction tracking
- MetaMask integration

## Prerequisites

- Node.js (v14+ recommended)
- npm or yarn
- MetaMask wallet
- Hardhat for local development

## Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd cryptovault
```

2. Install dependencies:
```bash
# Install smart contract dependencies
cd smart_contract
npm install

# Install client dependencies
cd ../client
npm install
```

3. Environment Setup:
- Copy `.env.example` to `.env` in both client and smart_contract directories
- Update the environment variables with your values
- NEVER commit the actual `.env` files

4. Start local blockchain (for development):
```bash
cd smart_contract
npx hardhat node
```

5. Deploy contracts (in a new terminal):
```bash
cd smart_contract
npx hardhat run scripts/deploy.js --network localhost
```

6. Start the frontend:
```bash
cd client
npm run dev
```

## Smart Contracts

The project includes two main smart contracts:
- `CryptoVault.sol`: Manages the ETH vault system
- `VaultToken.sol`: Handles the platform's token (CVLT) and staking

## Security Best Practices

1. Environment Variables:
   - Use `.env` files for sensitive data
   - Keep different `.env` files for development and production
   - Never commit actual `.env` files

2. Contract Deployment:
   - Use hardhat for local development
   - Test thoroughly before mainnet deployment
   - Verify contracts on Etherscan after deployment

3. Frontend Security:
   - Never expose private keys in frontend code
   - Use environment variables for contract addresses
   - Implement proper error handling

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

MIT
