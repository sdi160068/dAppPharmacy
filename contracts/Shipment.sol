// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

contract Pharmacy {
    enum Role {Admin, Supplier, Logistic, Auditor}
    enum EntityType { Supplier, Transportation, Manufacturer, Warehouse_Logistic, Distributor, Pharmacy }

    struct Product {
        uint256 id;
        string name;
        uint256 quantity;
        bool exists; // Track existence
        string currentLocation;
    }

    struct Shipment {
        uint256 shipment_id;
        uint256 origin;
        uint256 destination;
        uint256 date_of_departure;
        uint256 date_of_arrival;
        uint256[] products;  // list of product ids
    }

    struct ScEntity {
        address entity_address;
        string name;
        EntityType entityType;
        bool exists; // Track existence
    }

    struct User {
        address user_address;
        string name;
        Role role;
    }

    mapping(address => User) public users;
    mapping(address => uint256) public scEntities_index;
    mapping(uint256 => uint256) public products_index;
    uint256 products_ids = 1;

    Product[] public products_list;
    Shipment[] public shipments_list;
    ScEntity[] public scEntities_list;

    modifier only_for_role(Role role) {
        require(users[msg.sender].role == role, "Not authorized");
        _;
    }

    event ShipmentCreated(uint256 shipment_id, uint256 origin, uint256 destination, uint256 date_of_departure, uint256[] products);
    event ProductCreated(uint256 id, string name, uint256 quantity, string currentLocation);
    event ProductRemoved(uint256 id);
    event ScEntityCreated(address entity_address, string name, EntityType entityType);
    event ScEntityRemoved(address entity_address);

    constructor() {
        // Admin user
        User memory newUser = User({
            user_address: msg.sender,
            name: "Admin",
            role: Role.Admin
        });
        users[msg.sender] = newUser;
    }

    // User Management
    function create_user(string memory name, Role role, address user_address) public only_for_role(Role.Admin) {
        require(users[user_address].user_address != user_address, "User already exists");
        User memory newUser = User({
            user_address: user_address,
            name: name,
            role: role
        });
        users[user_address] = newUser;
    }
    
    function view_user(address user_address) public view returns (User memory) {
        return users[user_address];
    }

    // Shipment Management
    function create_shipment(uint256 origin, uint256 destination, uint256[] memory _products) public only_for_role(Role.Admin) {
        Shipment memory newShipment = Shipment({
            shipment_id: shipments_list.length,
            origin: origin,
            destination: destination,
            products: _products,
            date_of_departure: block.timestamp,
            date_of_arrival: 0
        });

        shipments_list.push(newShipment);
        emit ShipmentCreated(newShipment.shipment_id, newShipment.origin, newShipment.destination, newShipment.date_of_departure, newShipment.products);
    }

    function get_shipment(uint256 _i) public view returns (Shipment memory) {
        return shipments_list[_i];
    }

    function get_shipments() public view returns (Shipment[] memory) {
        return shipments_list;
    }

    function set_date_of_arrival(uint256 shipment_id) public {
        shipments_list[shipment_id].date_of_arrival = block.timestamp;
    }

    // Product Management
    function create_product(string memory name, uint256 quantity, string memory currentLocation) public {
        Product memory newProduct = Product({
            id: products_ids++,
            name: name,
            quantity: quantity,
            exists: true,
            currentLocation: currentLocation
        }); 
        
        products_index[newProduct.id] = products_list.length;
        products_list.push(newProduct);
        emit ProductCreated(newProduct.id, newProduct.name, newProduct.quantity, newProduct.currentLocation);
    }

    function remove_product(uint256 id) public {
        require(products_index[id] != 0 || products_list[0].id == id,"Product does not exist!");

        uint256 index = products_index[id];
        products_list[index] = products_list[products_list.length - 1];

        products_index[products_list[index].id] = index;
        delete products_index[id];
        
        products_list.pop();

        emit ProductRemoved(id);
    }

    function get_product(uint256 _i) public view returns (Product memory) {
        return products_list[_i];
    }

    function get_products() public view returns (Product[] memory) {
        return products_list;
    }

    function get_product_location(uint256 _i) public view returns (string memory) {
        return products_list[_i].currentLocation;
    }

    // scEntities (Supply Chain Entities) Management
    function create_ScEntity(address entity_address, string memory name, EntityType entityType) public only_for_role(Role.Admin) {
        require(scEntities_index[entity_address] == 0 && (scEntities_list.length == 0 || scEntities_list[scEntities_index[entity_address]].entity_address != entity_address), "Entity already exists!");

        ScEntity memory newScEntity = ScEntity({
            entity_address: entity_address,
            name: name,
            entityType: entityType,
            exists: true
        }); 
        
        scEntities_index[entity_address] = scEntities_list.length;
        scEntities_list.push(newScEntity);

        emit ScEntityCreated(newScEntity.entity_address, newScEntity.name, newScEntity.entityType);
    }

    function remove_ScEntity(address entity_address) public only_for_role(Role.Admin) {
        uint256 index = scEntities_index[entity_address];
        require(index < scEntities_list.length && scEntities_list[index].entity_address == entity_address, "Entity does not exist!");

        scEntities_list[index].exists = false;

        if (index != scEntities_list.length - 1) {
            scEntities_list[index] = scEntities_list[scEntities_list.length - 1];
            scEntities_index[scEntities_list[index].entity_address] = index;
        }

        scEntities_list.pop();
        delete scEntities_index[entity_address];

        emit ScEntityRemoved(entity_address);
    }

    function get_ScEntity(address entity_address) public view only_for_role(Role.Admin) returns (ScEntity memory) {
        uint256 index = scEntities_index[entity_address];
        require(index < scEntities_list.length && scEntities_list[index].entity_address == entity_address, "Entity does not exist!");

        return scEntities_list[index];
    }

    function get_ScEntities() public view only_for_role(Role.Admin) returns (ScEntity[] memory) {
        return scEntities_list;
    }
}
