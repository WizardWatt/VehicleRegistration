const hre = require("hardhat");

async function main() {
  console.log("Starting deployment of VehicleRegistry contract...");

  // Get the contract factory
  const VehicleRegistry = await hre.ethers.getContractFactory("VehicleRegistry");
  
  // Deploy the contract
  console.log("Deploying VehicleRegistry...");
  const vehicleRegistry = await VehicleRegistry.deploy();
  
  await vehicleRegistry.waitForDeployment();
  
  const address = await vehicleRegistry.getAddress();
  
  console.log("VehicleRegistry deployed to:", address);
  console.log("Deployment completed successfully!");
  
  // Wait for a few block confirmations
  console.log("Waiting for block confirmations...");
  await vehicleRegistry.deploymentTransaction().wait(5);
  
  console.log("Block confirmations received.");
  
  // Verify contract on Etherscan (if not on localhost/hardhat)
  if (hre.network.name !== "localhost" && hre.network.name !== "hardhat") {
    console.log("Verifying contract on Etherscan...");
    try {
      await hre.run("verify:verify", {
        address: address,
        constructorArguments: [],
      });
      console.log("Contract verified on Etherscan!");
    } catch (error) {
      console.log("Error verifying contract:", error.message);
    }
  }
  
  return address;
}

// Execute deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
