There should be users with different roles and different access rights to the data: 
(i) Administrator, with the possibility to add or remove participants
(ii) Supplier, with the possibility to view the status of the products up to the Manufacturer entity type (i.e. current location, quantity, shipping details)
(iii) Logistic employee, with access to all information up to the Warehouse_Logistic entity type
(iv) Controller, with access to all information.

Tell me how to do the above for a smart contract using solidity.


Define the Roles: Use the OpenZeppelin library for role management. OpenZeppelin provides a standardized way to handle roles and permissions.


// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/AccessControl.sol";

contract SupplyChain is AccessControl {
    // Define roles
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    bytes32 public constant SUPPLIER_ROLE = keccak256("SUPPLIER_ROLE");
    bytes32 public constant LOGISTIC_EMPLOYEE_ROLE = keccak256("LOGISTIC_EMPLOYEE_ROLE");
    bytes32 public constant CONTROLLER_ROLE = keccak256("CONTROLLER_ROLE");

    struct Product {
        uint256 id;
        string name;
        string currentLocation;
        uint256 quantity;
        string shippingDetails;
        string manufacturer;
        string warehouseLogistic;
    }

    uint256 private productCounter;
    mapping(uint256 => Product) private products;

    event ProductAdded(uint256 productId, string name);

    constructor() {
        // Grant ADMIN_ROLE to the contract deployer
        _setupRole(ADMIN_ROLE, msg.sender);

        // Grant other roles to the admin
        _setRoleAdmin(SUPPLIER_ROLE, ADMIN_ROLE);
        _setRoleAdmin(LOGISTIC_EMPLOYEE_ROLE, ADMIN_ROLE);
        _setRoleAdmin(CONTROLLER_ROLE, ADMIN_ROLE);
    }

    // Modifier to check admin role
    modifier onlyAdmin() {
        require(hasRole(ADMIN_ROLE, msg.sender), "Caller is not an admin");
        _;
    }

    // Modifier to check supplier role
    modifier onlySupplier() {
        require(hasRole(SUPPLIER_ROLE, msg.sender), "Caller is not a supplier");
        _;
    }

    // Modifier to check logistic employee role
    modifier onlyLogisticEmployee() {
        require(hasRole(LOGISTIC_EMPLOYEE_ROLE, msg.sender), "Caller is not a logistic employee");
        _;
    }

    // Modifier to check controller role
    modifier onlyController() {
        require(hasRole(CONTROLLER_ROLE, msg.sender), "Caller is not a controller");
        _;
    }

    // Admin functions to manage roles
    function addParticipant(address account, bytes32 role) public onlyAdmin {
        grantRole(role, account);
    }

    function removeParticipant(address account, bytes32 role) public onlyAdmin {
        revokeRole(role, account);
    }

    // Function to add product by admin
    function addProduct(string memory name, string memory manufacturer, string memory warehouseLogistic) public onlyAdmin {
        productCounter++;
        products[productCounter] = Product(productCounter, name, "", 0, "", manufacturer, warehouseLogistic);
        emit ProductAdded(productCounter, name);
    }

    // Supplier can view status up to the Manufacturer entity type
    function viewProductAsSupplier(uint256 productId) public view onlySupplier returns (string memory, string memory, uint256, string memory) {
        Product memory product = products[productId];
        return (product.name, product.currentLocation, product.quantity, product.shippingDetails);
    }

    // Logistic employee can access information up to the Warehouse_Logistic entity type
    function viewProductAsLogisticEmployee(uint256 productId) public view onlyLogisticEmployee returns (string memory, string memory, uint256, string memory, string memory) {
        Product memory product = products[productId];
        return (product.name, product.currentLocation, product.quantity, product.shippingDetails, product.manufacturer);
    }

    // Controller can access all information
    function viewProductAsController(uint256 productId) public view onlyController returns (Product memory) {
        return products[productId];
    }
}
