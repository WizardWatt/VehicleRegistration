# Quick Setup Guide

Get started with Vehicle Registry Blockchain in 5 minutes!

## For Testing in Remix IDE (Fastest)

1. Go to [Remix IDE](https://remix.ethereum.org/)
2. Create new file: `VehicleRegistry.sol`
3. Copy contract code from `contracts/VehicleRegistry.sol`
4. Click "Compile" (Solidity 0.8.0+)
5. Switch to "Deploy & Run" tab
6. Select "JavaScript VM" environment
7. Click "Deploy"
8. Test functions in the deployed contract panel

**That's it!** You can now register vehicles and test all functions.

## For Local Development (Recommended)

### Step 1: Clone and Install
```bash
git clone https://github.com/yourusername/vehicle-registry-blockchain.git
cd vehicle-registry-blockchain
npm install
```

### Step 2: Run Tests
```bash
npm test
```

### Step 3: Start Local Blockchain
```bash
npx hardhat node
```

### Step 4: Deploy Locally (in new terminal)
```bash
npx hardhat run scripts/deploy.js --network localhost
```

### Step 5: Interact with Contract
```bash
# Copy deployed address to scripts/interact.js
npx hardhat run scripts/interact.js --network localhost
```

## For Testnet Deployment

### Step 1: Get Test ETH
- Visit [Sepolia Faucet](https://sepoliafaucet.com/)
- Enter your MetaMask address
- Receive 0.5 test ETH

### Step 2: Configure Environment
```bash
cp .env.example .env
# Edit .env with your keys
```

### Step 3: Deploy
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### Step 4: Verify on Etherscan
```bash
npx hardhat verify --network sepolia YOUR_CONTRACT_ADDRESS
```

## Understanding the Contract

### Main Functions

```javascript
// Register a vehicle
await contract.registerVehicle("VIN123", "John Doe");

// Transfer ownership
await contract.transferOwnership("VIN123", newOwnerAddress, "Jane Smith");

// Get vehicle info
const vehicle = await contract.getVehicle("VIN123");

// Check history
const history = await contract.getVehicleHistory("VIN123");
```

### Events to Listen For

- `VehicleRegistered` - When a vehicle is registered
- `OwnershipTransferred` - When ownership changes
- `VerificationCompleted` - When verification occurs

## Common Commands

```bash
# Compile contracts
npx hardhat compile

# Run tests
npx hardhat test

# Run single test file
npx hardhat test test/VehicleRegistry.test.js

# Check test coverage
npx hardhat coverage

# Start local node
npx hardhat node

# Deploy to network
npx hardhat run scripts/deploy.js --network <network-name>

# Verify contract
npx hardhat verify --network <network-name> <address>

# Open Hardhat console
npx hardhat console --network <network-name>
```

## Project Structure

```
vehicle-registry-blockchain/
├── contracts/          # Smart contracts
├── scripts/           # Deployment scripts
├── test/              # Test files
├── docs/              # Documentation
├── hardhat.config.js  # Hardhat settings
└── README.md          # Main documentation
```

## What's Next?

1. **Read the README**: Full documentation in [README.md](../README.md)
2. **Explore Tests**: See `test/VehicleRegistry.test.js` for examples
3. **Check Architecture**: Read [ARCHITECTURE.md](ARCHITECTURE.md)
4. **Deploy Guide**: See [DEPLOYMENT.md](DEPLOYMENT.md)

## Need Help?

- 📖 [Full Documentation](../README.md)
- 🐛 [Report Issues](https://github.com/yourusername/vehicle-registry-blockchain/issues)
- 💬 [Discussions](https://github.com/yourusername/vehicle-registry-blockchain/discussions)

Happy coding! 🚗⛓️
