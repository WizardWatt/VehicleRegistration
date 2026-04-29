# 🚗 Vehicle Registry Blockchain

A decentralized vehicle registration system built on Ethereum blockchain using Solidity smart contracts. This system provides transparent, immutable, and secure vehicle ownership records with complete ownership history tracking.

## 📋 Table of Contents

- [Features](#features)
- [Smart Contract Overview](#smart-contract-overview)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contract Functions](#contract-functions)
- [Events](#events)
- [Security Considerations](#security-considerations)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Vehicle Registration**: Register new vehicles with unique IDs and owner information
- **Ownership Transfer**: Securely transfer vehicle ownership with full history tracking
- **Ownership History**: Complete immutable record of all previous owners
- **Vehicle Verification**: Verify the authenticity and registration status of any vehicle
- **Event Logging**: All critical actions emit events for transparency and tracking
- **Access Control**: Only vehicle owners can transfer ownership

## 📜 Smart Contract Overview

The `VehicleRegistry` smart contract stores vehicle information on-chain, including:

- Vehicle ID
- Current owner address
- Owner name
- Registration date
- Last transfer date
- Complete ownership history

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v14+ and npm
- [Hardhat](https://hardhat.org/) or [Truffle](https://trufflesuite.com/)
- [MetaMask](https://metamask.io/) wallet
- [Remix IDE](https://remix.ethereum.org/) (for quick testing)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/vehicle-registry-blockchain.git
cd vehicle-registry-blockchain
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

## 📁 Project Structure

```
vehicle-registry-blockchain/
├── contracts/              # Solidity smart contracts
│   └── VehicleRegistry.sol
├── scripts/               # Deployment and interaction scripts
│   ├── deploy.js
│   └── interact.js
├── test/                  # Contract tests
│   └── VehicleRegistry.test.js
├── docs/                  # Additional documentation
│   └── ARCHITECTURE.md
│   └── DEPLOYEMENT.md
│   └── QUICKSTART.md
│   └── STRUCTURE.md
├── .gitignore
├── hardhat.config.js      # Hardhat configuration
├── package.json
├── README.md
├── LICENSE
└── CONTRIBUTING.md
```

## 💻 Usage

### Using Remix IDE

1. Open [Remix IDE](https://remix.ethereum.org/)
2. Create a new file `VehicleRegistry.sol`
3. Copy the contract code from `contracts/VehicleRegistry.sol`
4. Compile with Solidity compiler 0.8.0+
5. Deploy to JavaScript VM, Injected Provider, or any test network

### Local Development with Hardhat

1. Compile contracts:
```bash
npx hardhat compile
```

2. Run tests:
```bash
npx hardhat test
```

3. Deploy to local network:
```bash
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```

4. Deploy to testnet (e.g., Sepolia):
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

## 🧪 Testing

Run the test suite:
```bash
npx hardhat test
```

Run tests with coverage:
```bash
npx hardhat coverage
```

## 🌐 Deployment

### Deploy to Ethereum Testnet (Sepolia/Goerli)

1. Get testnet ETH from a faucet
2. Configure your `.env` file with private key and Infura/Alchemy API key
3. Run deployment script:
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### Deploy to Mainnet

⚠️ **Warning**: Deploying to mainnet requires real ETH. Ensure thorough testing before deployment.

```bash
npx hardhat run scripts/deploy.js --network mainnet
```

## 📖 Contract Functions

### Public Functions

#### `registerVehicle(string _vehicleId, string _ownerName)`
Register a new vehicle to the blockchain.

**Parameters:**
- `_vehicleId`: Unique identifier for the vehicle (e.g., VIN, registration number)
- `_ownerName`: Name of the vehicle owner

**Requirements:**
- Vehicle ID must not already exist
- Both parameters must not be empty

---

#### `transferOwnership(string _vehicleId, address _newOwner, string _newOwnerName)`
Transfer vehicle ownership to a new owner.

**Parameters:**
- `_vehicleId`: ID of the vehicle to transfer
- `_newOwner`: Ethereum address of the new owner
- `_newOwnerName`: Name of the new owner

**Requirements:**
- Caller must be the current owner
- New owner address must be valid and different from current owner
- New owner name must not be empty

---

#### `getVehicle(string _vehicleId)`
Retrieve complete vehicle information.

**Returns:** Vehicle struct with all details

---

#### `getVehicleHistory(string _vehicleId)`
Get the complete ownership history of a vehicle.

**Returns:** Array of all previous owner addresses

---

#### `verifyVehicle(string _vehicleId)`
Verify if a vehicle is registered in the system.

**Returns:** Boolean indicating registration status

---

#### `getAllRegisteredVehicles()`
Get list of all registered vehicle IDs.

**Returns:** Array of vehicle ID strings

---

#### `getVehicleCount()`
Get total number of registered vehicles.

**Returns:** Count of registered vehicles

## 📢 Events

### `VehicleRegistered`
```solidity
event VehicleRegistered(
    string indexed vehicleId,
    address indexed owner,
    string ownerName,
    uint256 timestamp
)
```

### `OwnershipTransferred`
```solidity
event OwnershipTransferred(
    string indexed vehicleId,
    address indexed previousOwner,
    address indexed newOwner,
    string newOwnerName,
    uint256 timestamp
)
```

### `VerificationCompleted`
```solidity
event VerificationCompleted(
    string indexed vehicleId,
    bool isValid,
    uint256 timestamp
)
```

## 🔒 Security Considerations

- **Access Control**: Only vehicle owners can transfer ownership
- **Input Validation**: All inputs are validated before processing
- **Immutable Records**: Once registered, vehicle IDs cannot be changed
- **Event Logging**: All critical operations emit events for transparency
- **Reentrancy**: No external calls that could lead to reentrancy attacks

### Recommended Security Audits

Before deploying to mainnet, consider:
- Professional smart contract audit
- Extensive testing on testnets
- Bug bounty program
- Gradual rollout strategy

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

Project Link: [https://github.com/yourusername/vehicle-registry-blockchain](https://github.com/yourusername/vehicle-registry-blockchain)

## 🙏 Acknowledgments

- OpenZeppelin for smart contract best practices
- Ethereum community for documentation and support
- Remix IDE for development and testing tools

---

**Note**: This is a demonstration project. For production use, additional features and security measures should be implemented, including:
- Role-based access control for administrators
- Integration with real-world vehicle databases
- KYC/AML compliance features
- Dispute resolution mechanisms
- Multi-signature requirements for critical operations
