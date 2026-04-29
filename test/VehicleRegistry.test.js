const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("VehicleRegistry", function () {
  let VehicleRegistry;
  let vehicleRegistry;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  const VEHICLE_ID_1 = "ABC123XYZ";
  const VEHICLE_ID_2 = "DEF456UVW";
  const OWNER_NAME_1 = "John Doe";
  const OWNER_NAME_2 = "Jane Smith";
  const NEW_OWNER_NAME = "Bob Johnson";

  beforeEach(async function () {
    // Get signers
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // Deploy contract
    VehicleRegistry = await ethers.getContractFactory("VehicleRegistry");
    vehicleRegistry = await VehicleRegistry.deploy();
    await vehicleRegistry.waitForDeployment();
  });

  describe("Vehicle Registration", function () {
    it("Should register a new vehicle successfully", async function () {
      await expect(vehicleRegistry.registerVehicle(VEHICLE_ID_1, OWNER_NAME_1))
        .to.emit(vehicleRegistry, "VehicleRegistered")
        .withArgs(VEHICLE_ID_1, owner.address, OWNER_NAME_1, await getLatestTimestamp());

      const vehicle = await vehicleRegistry.getVehicle(VEHICLE_ID_1);
      expect(vehicle.vehicleId).to.equal(VEHICLE_ID_1);
      expect(vehicle.owner).to.equal(owner.address);
      expect(vehicle.ownerName).to.equal(OWNER_NAME_1);
      expect(vehicle.exists).to.be.true;
    });

    it("Should fail to register vehicle with empty vehicle ID", async function () {
      await expect(
        vehicleRegistry.registerVehicle("", OWNER_NAME_1)
      ).to.be.revertedWith("Vehicle ID cannot be empty");
    });

    it("Should fail to register vehicle with empty owner name", async function () {
      await expect(
        vehicleRegistry.registerVehicle(VEHICLE_ID_1, "")
      ).to.be.revertedWith("Owner name cannot be empty");
    });

    it("Should fail to register already registered vehicle", async function () {
      await vehicleRegistry.registerVehicle(VEHICLE_ID_1, OWNER_NAME_1);
      
      await expect(
        vehicleRegistry.registerVehicle(VEHICLE_ID_1, OWNER_NAME_2)
      ).to.be.revertedWith("Vehicle already registered");
    });

    it("Should register multiple vehicles", async function () {
      await vehicleRegistry.registerVehicle(VEHICLE_ID_1, OWNER_NAME_1);
      await vehicleRegistry.registerVehicle(VEHICLE_ID_2, OWNER_NAME_2);

      const count = await vehicleRegistry.getVehicleCount();
      expect(count).to.equal(2);
    });
  });

  describe("Ownership Transfer", function () {
    beforeEach(async function () {
      await vehicleRegistry.registerVehicle(VEHICLE_ID_1, OWNER_NAME_1);
    });

    it("Should transfer ownership successfully", async function () {
      await expect(
        vehicleRegistry.transferOwnership(VEHICLE_ID_1, addr1.address, NEW_OWNER_NAME)
      )
        .to.emit(vehicleRegistry, "OwnershipTransferred")
        .withArgs(VEHICLE_ID_1, owner.address, addr1.address, NEW_OWNER_NAME, await getLatestTimestamp());

      const vehicle = await vehicleRegistry.getVehicle(VEHICLE_ID_1);
      expect(vehicle.owner).to.equal(addr1.address);
      expect(vehicle.ownerName).to.equal(NEW_OWNER_NAME);
    });

    it("Should fail to transfer non-existent vehicle", async function () {
      await expect(
        vehicleRegistry.transferOwnership("INVALID", addr1.address, NEW_OWNER_NAME)
      ).to.be.revertedWith("Vehicle does not exist");
    });

    it("Should fail if caller is not the owner", async function () {
      await expect(
        vehicleRegistry.connect(addr1).transferOwnership(VEHICLE_ID_1, addr2.address, NEW_OWNER_NAME)
      ).to.be.revertedWith("Only vehicle owner can perform this action");
    });

    it("Should fail to transfer to zero address", async function () {
      await expect(
        vehicleRegistry.transferOwnership(VEHICLE_ID_1, ethers.ZeroAddress, NEW_OWNER_NAME)
      ).to.be.revertedWith("Invalid new owner address");
    });

    it("Should fail to transfer to same owner", async function () {
      await expect(
        vehicleRegistry.transferOwnership(VEHICLE_ID_1, owner.address, NEW_OWNER_NAME)
      ).to.be.revertedWith("New owner must be different from current owner");
    });

    it("Should fail with empty new owner name", async function () {
      await expect(
        vehicleRegistry.transferOwnership(VEHICLE_ID_1, addr1.address, "")
      ).to.be.revertedWith("New owner name cannot be empty");
    });

    it("Should maintain ownership history correctly", async function () {
      // Transfer to addr1
      await vehicleRegistry.transferOwnership(VEHICLE_ID_1, addr1.address, NEW_OWNER_NAME);
      
      // Transfer to addr2
      await vehicleRegistry.connect(addr1).transferOwnership(VEHICLE_ID_1, addr2.address, "Alice Brown");

      const history = await vehicleRegistry.getVehicleHistory(VEHICLE_ID_1);
      expect(history.length).to.equal(3);
      expect(history[0]).to.equal(owner.address);
      expect(history[1]).to.equal(addr1.address);
      expect(history[2]).to.equal(addr2.address);
    });
  });

  describe("Vehicle Verification", function () {
    beforeEach(async function () {
      await vehicleRegistry.registerVehicle(VEHICLE_ID_1, OWNER_NAME_1);
    });

    it("Should verify existing vehicle", async function () {
      await expect(vehicleRegistry.verifyVehicle(VEHICLE_ID_1))
        .to.emit(vehicleRegistry, "VerificationCompleted")
        .withArgs(VEHICLE_ID_1, true, await getLatestTimestamp());
    });

    it("Should fail to verify non-existent vehicle", async function () {
      await expect(
        vehicleRegistry.verifyVehicle("INVALID")
      ).to.be.revertedWith("Vehicle does not exist");
    });
  });

  describe("Vehicle Retrieval", function () {
    beforeEach(async function () {
      await vehicleRegistry.registerVehicle(VEHICLE_ID_1, OWNER_NAME_1);
      await vehicleRegistry.registerVehicle(VEHICLE_ID_2, OWNER_NAME_2);
    });

    it("Should get vehicle details", async function () {
      const vehicle = await vehicleRegistry.getVehicle(VEHICLE_ID_1);
      expect(vehicle.vehicleId).to.equal(VEHICLE_ID_1);
      expect(vehicle.owner).to.equal(owner.address);
      expect(vehicle.ownerName).to.equal(OWNER_NAME_1);
      expect(vehicle.exists).to.be.true;
    });

    it("Should fail to get non-existent vehicle", async function () {
      await expect(
        vehicleRegistry.getVehicle("INVALID")
      ).to.be.revertedWith("Vehicle does not exist");
    });

    it("Should get all registered vehicles", async function () {
      const allVehicles = await vehicleRegistry.getAllRegisteredVehicles();
      expect(allVehicles.length).to.equal(2);
      expect(allVehicles[0]).to.equal(VEHICLE_ID_1);
      expect(allVehicles[1]).to.equal(VEHICLE_ID_2);
    });

    it("Should get correct vehicle count", async function () {
      const count = await vehicleRegistry.getVehicleCount();
      expect(count).to.equal(2);
    });

    it("Should get vehicle history", async function () {
      const history = await vehicleRegistry.getVehicleHistory(VEHICLE_ID_1);
      expect(history.length).to.equal(1);
      expect(history[0]).to.equal(owner.address);
    });

    it("Should fail to get history of non-existent vehicle", async function () {
      await expect(
        vehicleRegistry.getVehicleHistory("INVALID")
      ).to.be.revertedWith("Vehicle does not exist");
    });
  });

  describe("Public Mapping Access", function () {
    beforeEach(async function () {
      await vehicleRegistry.registerVehicle(VEHICLE_ID_1, OWNER_NAME_1);
    });

    it("Should access vehicle through public mapping", async function () {
      const vehicle = await vehicleRegistry.vehicles(VEHICLE_ID_1);
      expect(vehicle.vehicleId).to.equal(VEHICLE_ID_1);
      expect(vehicle.owner).to.equal(owner.address);
      expect(vehicle.exists).to.be.true;
    });

    it("Should access registered vehicles array", async function () {
      const firstVehicle = await vehicleRegistry.registeredVehicles(0);
      expect(firstVehicle).to.equal(VEHICLE_ID_1);
    });
  });

  describe("Edge Cases", function () {
    it("Should handle vehicle IDs with special characters", async function () {
      const specialId = "ABC-123_XYZ.456";
      await vehicleRegistry.registerVehicle(specialId, OWNER_NAME_1);
      
      const vehicle = await vehicleRegistry.getVehicle(specialId);
      expect(vehicle.vehicleId).to.equal(specialId);
    });

    it("Should handle long owner names", async function () {
      const longName = "A".repeat(100);
      await vehicleRegistry.registerVehicle(VEHICLE_ID_1, longName);
      
      const vehicle = await vehicleRegistry.getVehicle(VEHICLE_ID_1);
      expect(vehicle.ownerName).to.equal(longName);
    });

    it("Should track timestamps correctly", async function () {
      await vehicleRegistry.registerVehicle(VEHICLE_ID_1, OWNER_NAME_1);
      const vehicle1 = await vehicleRegistry.getVehicle(VEHICLE_ID_1);
      
      // Wait a bit
      await ethers.provider.send("evm_increaseTime", [100]);
      await ethers.provider.send("evm_mine");
      
      await vehicleRegistry.transferOwnership(VEHICLE_ID_1, addr1.address, NEW_OWNER_NAME);
      const vehicle2 = await vehicleRegistry.getVehicle(VEHICLE_ID_1);
      
      expect(vehicle2.lastTransferDate).to.be.gt(vehicle1.lastTransferDate);
    });
  });

  // Helper function to get latest block timestamp
  async function getLatestTimestamp() {
    const blockNumber = await ethers.provider.getBlockNumber();
    const block = await ethers.provider.getBlock(blockNumber);
    return block.timestamp;
  }
});
