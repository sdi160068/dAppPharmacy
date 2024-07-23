// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;


// Supplier -> Supplier,Transportation, Manufacturer
// Logistic Employee -> Supplier,Transportation, Manufacturer, Warehouse_Logistic
// Auditor -> Supplier,Transportation, Manufacturer, Warehouse_Logistic, Distributor, Pharmacy
// Admin -> Supplier,Transportation, Manufacturer, Warehouse_Logistic, Distributor, Pharmacy


// modifier only_admin() {
//         require(users[msg.sender].role == Role.Admin, "Only admins can perform this action");
//         _;
//     }

//     modifier only_supplier() {
//         require(users[msg.sender].role == Role.Supplier, "Only suppliers can perform this action");
//         _;
//     }

//     modifier only_logistic() {
//         require(users[msg.sender].role == Role.Logistic, "Only logistic employees can perform this action");
//         _;
//     }

//     modifier only_controller() {
//         require(users[msg.sender].role == Role.Controller, "Only controllers can perform this action");
//         _;
//     }

//     modifier only_authorized_to_view_product(uint256 product_id) {
//         require(
//             users[msg.sender].role == Role.Admin ||
//             (users[msg.sender].role == Role.Supplier && keccak256(bytes(products[product_id].current_location)) == keccak256(bytes("Manufacturer"))) ||
//             (users[msg.sender].role == Role.Logistic && (keccak256(bytes(products[product_id].current_location)) == keccak256(bytes("Manufacturer")) || keccak256(bytes(products[product_id].current_location)) == keccak256(bytes("Logistic Warehouse")))) ||
//             users[msg.sender].role == Role.Controller,
//             "Not authorized to view this product"
//         );
//         _;
//     }

//     modifier only_authorized_to_view_shipment(uint256 shipment_id) {
//         require(
//             users[msg.sender].role == Role.Admin ||
//             (users[msg.sender].role == Role.Supplier && shipments[shipment_id].destination <= 1) || // Assuming 0: Supplier, 1: Manufacturer
//             (users[msg.sender].role == Role.Logistic && shipments[shipment_id].destination <= 2) || // Assuming 2: Logistic Warehouse
//             users[msg.sender].role == Role.Controller,
//             "Not authorized to view this shipment"
//         );
//         _;
//     }

contract Pharmacy{
    enum Role {Admin, Supplier, Logistic, Auditor}
    enum EntityType { Supplier,Transportation, Manufacturer, Warehouse_Logistic, Distributor, Pharmacy }

    struct Product{
        uint256 id;
        string name;
        uint256 quantity;
        string currentLocation;
    }

    struct Shipment{
        uint256 shipment_id;
        uint256 origin;
        uint256 destination;
        uint256 date_of_departure;
        uint256 date_of_arrival;
        uint256[] products;         // list of products ids
    }

    struct ScEntity{    // supply chain entity
        uint256 id;
        string name;
        EntityType entityType;
    }

    struct User{
        address user_address;
        string name;
        Role role;
    }

    mapping(uint256 => Product) public products;
    mapping(uint256 => Shipment) public shipments;
    mapping(address => User) public users;
    mapping(uint256 => ScEntity) public scEntities;
    
    Product[] public products_list;
    Shipment[] public shipments_list;
    ScEntity[] public scEntities_list;

    modifier only_for_role(Role role) {
        require(users[msg.sender].role != role, "Only admins");
        _;
    }

    event ShipmentCreated(uint256 shipment_id, uint256 origin, uint256 destination, uint256 date_of_departure, uint256[] products);
    event ProductCreated(uint256 id, string name, uint256 quantity, string currentLocation);
    event ScEntityCreated(uint256 id, string name, EntityType entityType);

    constructor() {
        User memory newUser = User({
            user_address : msg.sender,
            name : "Admin",
            role: Role.Admin
        });
        
        users[msg.sender] = newUser;
    }

    // User management
    function create_user(string memory name, Role role, address user_address) public only_for_role(Role.Admin) {
        require(! (users[msg.sender].user_address == msg.sender ), "User already exists");
        User memory newUser = User({
            user_address : user_address,
            name : name,
            role: role
        });
        
        users[msg.sender] = newUser;
    }
    
    function view_user(address user_address) public view returns (User memory) {
        return users[user_address];
    }

    // Shipment Management
    function create_shipment(uint256 origin, uint256 destination,uint256[] memory _products) public only_for_role(Role.Admin) {
        Shipment memory newShipment = Shipment({
            shipment_id : shipments_list.length,
            origin : origin,
            destination : destination,
            products : _products,
            date_of_departure : block.timestamp,
            date_of_arrival : 0
        });

        shipments[shipments_list.length] = newShipment;
        shipments_list.push(newShipment);
        emit ShipmentCreated(newShipment.shipment_id, newShipment.origin, newShipment.destination, newShipment.date_of_departure, newShipment.products);
    }

    function get_shipment(uint256 _i) public view returns (Shipment memory) {
        return shipments[_i];
    }

    function get_shipments() public view returns (Shipment[] memory){
        return shipments_list;
    }

    function set_date_of_arrival(uint256 shipment_id) public {
        shipments[shipment_id].date_of_arrival = block.timestamp;
    }

    // Product Management
    function create_product(string memory name, uint256 quantity, string memory currentLocation) public {
       Product memory newProduct = Product({
            id : products_list.length,
            name: name,
            quantity : quantity,
            currentLocation : currentLocation
        }); 
        
        products[products_list.length] = newProduct;
        products_list.push(newProduct);
        emit ProductCreated(newProduct.id, newProduct.name, newProduct.quantity, newProduct.currentLocation);
    }

    function get_product(uint256 _i) public view returns (Product memory) {
        return products[_i];
    }

    function get_product_location(uint256 _i) public view returns (string memory) {
        return products[_i].currentLocation;
    }

    function get_products() public view returns (Product[] memory){
        return products_list;
    }

    // scEntities (supply chain Entities) Management
    function create_ScEntity(string memory name,EntityType entityType ) public only_for_role(Role.Admin) {
        ScEntity memory newScEntity = ScEntity({
            id : products_list.length,
            name: name,
            entityType : entityType
        }); 
        
        scEntities[scEntities_list.length] = newScEntity;
        scEntities_list.push(newScEntity);
        emit ScEntityCreated(newScEntity.id, newScEntity.name, newScEntity.entityType);
    }

}
