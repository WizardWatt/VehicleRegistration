// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VehicleRegistry {
    // Struct to represent a vehicle
    struct Vehicle {
        string vehicleId;
        address owner;
        string ownerName;
        bool exists;
        uint256 registrationDate;
        uint256 lastTransferDate;
    }

    // Mapping to store vehicles by vehicleId
    mapping(string => Vehicle) public vehicles;

    // Mapping to store ownership history
    mapping(string => address[]) public vehicleHistory;

    // Array to store all registered vehicle IDs
    string[] public registeredVehicles;

    // Events
    event VehicleRegistered(
        string indexed vehicleId,
        address indexed owner,
        string ownerName,
        uint256 timestamp
    );

    event OwnershipTransferred(
        string indexed vehicleId,
        address indexed previousOwner,
        address indexed newOwner,
        string newOwnerName,
        uint256 timestamp
    );

    event VerificationCompleted(
        string indexed vehicleId,
        bool isValid,
        uint256 timestamp
    );

    // Modifier to check if vehicle exists
    modifier vehicleExists(string memory _vehicleId) {
        require(vehicles[_vehicleId].exists, "Vehicle does not exist");
        _;
    }

    // Modifier to check if caller is owner
    modifier onlyOwner(string memory _vehicleId) {
        require(
            vehicles[_vehicleId].owner == msg.sender,
            "Only vehicle owner can perform this action"
        );
        _;
    }

    // Register a new vehicle
    function registerVehicle(
        string memory _vehicleId,
        string memory _ownerName
    ) public {
        require(
            !vehicles[_vehicleId].exists,
            "Vehicle already registered"
        );
        require(bytes(_vehicleId).length > 0, "Vehicle ID cannot be empty");
        require(bytes(_ownerName).length > 0, "Owner name cannot be empty");

        vehicles[_vehicleId] = Vehicle({
            vehicleId: _vehicleId,
            owner: msg.sender,
            ownerName: _ownerName,
            exists: true,
            registrationDate: block.timestamp,
            lastTransferDate: block.timestamp
        });

        vehicleHistory[_vehicleId].push(msg.sender);
        registeredVehicles.push(_vehicleId);

        emit VehicleRegistered(_vehicleId, msg.sender, _ownerName, block.timestamp);
    }

    // Transfer vehicle ownership
    function transferOwnership(
        string memory _vehicleId,
        address _newOwner,
        string memory _newOwnerName
    ) public vehicleExists(_vehicleId) onlyOwner(_vehicleId) {
        require(_newOwner != address(0), "Invalid new owner address");
        require(_newOwner != msg.sender, "New owner must be different from current owner");
        require(bytes(_newOwnerName).length > 0, "New owner name cannot be empty");

        address previousOwner = vehicles[_vehicleId].owner;

        vehicles[_vehicleId].owner = _newOwner;
        vehicles[_vehicleId].ownerName = _newOwnerName;
        vehicles[_vehicleId].lastTransferDate = block.timestamp;

        vehicleHistory[_vehicleId].push(_newOwner);

        emit OwnershipTransferred(
            _vehicleId,
            previousOwner,
            _newOwner,
            _newOwnerName,
            block.timestamp
        );
    }

    // Get vehicle details
    function getVehicle(string memory _vehicleId)
        public
        view
        vehicleExists(_vehicleId)
        returns (Vehicle memory)
    {
        return vehicles[_vehicleId];
    }

    // Get vehicle ownership history
    function getVehicleHistory(string memory _vehicleId)
        public
        view
        vehicleExists(_vehicleId)
        returns (address[] memory)
    {
        return vehicleHistory[_vehicleId];
    }

    // Verify vehicle authenticity
    function verifyVehicle(string memory _vehicleId)
        public
        vehicleExists(_vehicleId)
        returns (bool)
    {
        emit VerificationCompleted(_vehicleId, true, block.timestamp);
        return true;
    }

    // Get all registered vehicles
    function getAllRegisteredVehicles() public view returns (string[] memory) {
        return registeredVehicles;
    }

    // Get total number of registered vehicles
    function getVehicleCount() public view returns (uint256) {
        return registeredVehicles.length;
    }
}
