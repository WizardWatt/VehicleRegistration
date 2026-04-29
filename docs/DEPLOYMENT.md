# Deployment Guide

This guide walks through deploying the VehicleRegistry smart contract to various Ethereum networks.

## Prerequisites

- Node.js v14+ installed
- MetaMask wallet with test ETH
- Infura or Alchemy account (for remote networks)
- Etherscan API key (for contract verification)

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
PRIVATE_KEY=your_wallet_private_key_here
ETHERSCAN_API_KEY=your_etherscan_api_key
```

⚠️ **Security Warning**: Never commit your `.env` file or share your private key!

## Local Development Network

### Using Hardhat Network

1. Start a local Hardhat node:
```bash
npx hardhat node
```

2. In a new terminal, deploy the contract:
```bash
npx hardhat run scripts/deploy.js --network localhost
```

3. Test the deployment:
```bash
# Update CONTRACT_ADDRESS in scripts/interact.js
npx hardhat run scripts/interact.js --network localhost
```

## Testnet Deployment

### Sepolia Testnet

1. **Get Sepolia ETH**
   - Visit [Sepolia Faucet](https://sepoliafaucet.com/)
   - Enter your wallet address
   - Receive test ETH (usually 0.5 ETH)

2. **Configure Sepolia RPC**
   - Sign up at [Alchemy](https://www.alchemy.com/) or [Infura](https://www.infura.io/)
   - Create a new project
   - Copy the Sepolia RPC URL to `.env`

3. **Deploy to Sepolia**
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

4. **Verify Contract on Etherscan**
```bash
npx hardhat verify --network sepolia DEPLOYED_CONTRACT_ADDRESS
```

### Goerli Testnet (Deprecated but still available)

Similar process as Sepolia:

```bash
# Get Goerli ETH from faucet
# Configure GOERLI_RPC_URL in .env
npx hardhat run scripts/deploy.js --network goerli
```

## Mainnet Deployment

⚠️ **DANGER ZONE**: Mainnet deployment uses real ETH. Triple-check everything!

### Pre-Deployment Checklist

- [ ] All tests pass (`npm test`)
- [ ] Security audit completed
- [ ] Gas optimization reviewed
- [ ] Contract verified on testnet
- [ ] Sufficient ETH for deployment (check gas prices)
- [ ] Backup of private key in secure location
- [ ] Team review completed

### Deployment Steps

1. **Estimate Gas Costs**
```bash
# Check current gas prices at https://etherscan.io/gastracker
# Estimate: ~2,000,000 gas for deployment
# Calculate: gas * gasPrice = total cost
```

2. **Configure Mainnet**

Update `.env`:
```env
MAINNET_RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY
PRIVATE_KEY=your_mainnet_wallet_private_key
```

3. **Deploy to Mainnet**
```bash
npx hardhat run scripts/deploy.js --network mainnet
```

4. **Verify on Etherscan**
```bash
npx hardhat verify --network mainnet DEPLOYED_CONTRACT_ADDRESS
```

5. **Test the Deployment**
```bash
# Update CONTRACT_ADDRESS in scripts/interact.js
npx hardhat run scripts/interact.js --network mainnet
```

## Post-Deployment

### 1. Save Contract Information

Create a `deployments.json` file:
```json
{
  "sepolia": {
    "VehicleRegistry": "0x...",
    "deploymentBlock": 12345678,
    "deployer": "0x...",
    "timestamp": "2024-01-01T00:00:00Z"
  },
  "mainnet": {
    "VehicleRegistry": "0x...",
    "deploymentBlock": 98765432,
    "deployer": "0x...",
    "timestamp": "2024-01-01T00:00:00Z"
  }
}
```

### 2. Update Documentation

- Add contract address to README.md
- Update frontend configuration
- Document any deployment issues
- Create release notes

### 3. Monitor the Contract

- Watch for transactions on Etherscan
- Set up event monitoring
- Create alerts for suspicious activity
- Monitor gas costs

### 4. Announcement

- Announce on social media
- Update project website
- Notify stakeholders
- Publish verified contract link

## Troubleshooting

### Common Issues

**Issue**: `insufficient funds for gas * price + value`
**Solution**: Ensure your wallet has enough ETH. Check balance:
```bash
npx hardhat console --network sepolia
> (await ethers.provider.getBalance("YOUR_ADDRESS"))
```

**Issue**: `nonce has already been used`
**Solution**: Reset MetaMask account or wait for pending transactions to complete

**Issue**: `Contract verification failed`
**Solution**: Ensure you're using the exact compiler version and settings:
```bash
npx hardhat verify --network sepolia CONTRACT_ADDRESS \
  --constructor-args arguments.js
```

**Issue**: Deployment stuck/pending
**Solution**: Check gas price. Might be too low:
```javascript
// In hardhat.config.js
sepolia: {
  // ...
  gasPrice: 20000000000, // 20 gwei
}
```

### Getting Help

- Check [Hardhat documentation](https://hardhat.org/getting-started/)
- Visit [Ethereum Stack Exchange](https://ethereum.stackexchange.com/)
- Join our community Discord/Telegram

## Network Information

### Testnets

| Network | Chain ID | Explorer | Faucet |
|---------|----------|----------|--------|
| Sepolia | 11155111 | https://sepolia.etherscan.io | https://sepoliafaucet.com |
| Goerli | 5 | https://goerli.etherscan.io | https://goerlifaucet.com |

### Mainnet

| Network | Chain ID | Explorer |
|---------|----------|----------|
| Ethereum | 1 | https://etherscan.io |

## Alternative Deployment Methods

### Using Remix IDE

1. Open [Remix IDE](https://remix.ethereum.org/)
2. Upload `VehicleRegistry.sol`
3. Compile with Solidity 0.8.0+
4. Connect MetaMask (Injected Provider)
5. Deploy the contract
6. Copy the deployed address

### Using Truffle

If you prefer Truffle over Hardhat:

1. Install Truffle:
```bash
npm install -g truffle
```

2. Initialize Truffle:
```bash
truffle init
```

3. Create migration:
```javascript
// migrations/2_deploy_contracts.js
const VehicleRegistry = artifacts.require("VehicleRegistry");

module.exports = function (deployer) {
  deployer.deploy(VehicleRegistry);
};
```

4. Deploy:
```bash
truffle migrate --network sepolia
```

## Cost Estimation

### Gas Costs (Approximate)

- **Deployment**: ~2,000,000 gas
- **Register Vehicle**: ~150,000 gas
- **Transfer Ownership**: ~100,000 gas
- **View Functions**: Free

### Price Examples

At 50 gwei gas price and $2000 ETH:

- Deployment: 0.1 ETH = $200
- Register: 0.0075 ETH = $15
- Transfer: 0.005 ETH = $10

### Tips to Reduce Costs

1. Deploy during low gas periods (weekends, early morning UTC)
2. Use Layer 2 solutions (Polygon, Optimism)
3. Optimize contract code
4. Batch operations when possible

## Security Best Practices

1. **Never expose private keys**
   - Use hardware wallet for mainnet
   - Use environment variables
   - Add `.env` to `.gitignore`

2. **Test thoroughly**
   - Deploy to testnet first
   - Run all test cases
   - Perform security audit

3. **Verify contracts**
   - Always verify on Etherscan
   - Enables public auditing
   - Increases trust

4. **Monitor after deployment**
   - Watch for unusual activity
   - Set up alerts
   - Have emergency response plan

## Upgrade Considerations

This contract is **not upgradeable**. For future versions:

1. Deploy new contract
2. Migrate data (if needed)
3. Update frontend to use new address
4. Deprecate old contract gracefully

Consider implementing proxy pattern for future deployments if upgradeability is needed.

---

**Next Steps**: After deployment, see [ARCHITECTURE.md](docs/ARCHITECTURE.md) for integration guidance.
