const hre = require("hardhat");

async function main() {
  // Replace with your deployed contract address
  const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS_HERE";
  
  console.log("Interacting with VehicleRegistry at:", CONTRACT_ADDRESS);
  
  // Get contract instance
  const VehicleRegistry = await hre.ethers.getContractFactory("VehicleRegistry");
  const vehicleRegistry = VehicleRegistry.attach(CONTRACT_ADDRESS);
  
  // Get signers
  const [owner, addr1, addr2] = await hre.ethers.getSigners();
  
  console.log("\n1. Registering a new vehicle...");
  const vehicleId = "ABC123XYZ";
  const ownerName = "John Doe";
  
  const registerTx = await vehicleRegistry.registerVehicle(vehicleId, ownerName);
  await registerTx.wait();
  console.log("Vehicle registered successfully!");
  
  console.log("\n2. Getting vehicle details...");
  const vehicle = await vehicleRegistry.getVehicle(vehicleId);
  console.log("Vehicle Details:");
  console.log("  Vehicle ID:", vehicle.vehicleId);
  console.log("  Owner:", vehicle.owner);
  console.log("  Owner Name:", vehicle.ownerName);
  console.log("  Registration Date:", new Date(Number(vehicle.registrationDate) * 1000).toLocaleString());
  
  console.log("\n3. Verifying vehicle...");
  const verifyTx = await vehicleRegistry.verifyVehicle(vehicleId);
  await verifyTx.wait();
  console.log("Vehicle verified successfully!");
  
  console.log("\n4. Transferring ownership...");
  const transferTx = await vehicleRegistry.transferOwnership(
    vehicleId,
    addr1.address,
    "Jane Smith"
  );
  await transferTx.wait();
  console.log("Ownership transferred successfully!");
  
  console.log("\n5. Getting ownership history...");
  const history = await vehicleRegistry.getVehicleHistory(vehicleId);
  console.log("Ownership History:");
  history.forEach((addr, index) => {
    console.log(`  Owner ${index + 1}:`, addr);
  });
  
  console.log("\n6. Getting all registered vehicles...");
  const allVehicles = await vehicleRegistry.getAllRegisteredVehicles();
  console.log("Total Registered Vehicles:", allVehicles.length);
  console.log("Vehicle IDs:", allVehicles);
  
  console.log("\n7. Getting vehicle count...");
  const count = await vehicleRegistry.getVehicleCount();
  console.log("Total Count:", count.toString());
  
  console.log("\nInteraction completed successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
