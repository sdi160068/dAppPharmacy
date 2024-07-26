// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.9.0;

contract Pharmacy {
    enum Role {Admin, Supplier, Logistic, Auditor}
    enum EntityType { Supplier, Transportation, Manufacturer, Warehouse_Logistic, Distributor, Pharmacy }

    struct Product {
        uint256 id;
        string name;
        uint256 quantity;
        address currentScEntity;
    }

    struct Shipment {
        uint256 shipment_id;
        address origin;
        address destination;
        uint256 date_of_departure;
        uint256 expected_date_of_arrival;
        uint256 product_id;
    }

    struct ScEntity {
        address entity_address;
        string name;
        EntityType entityType;
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

    // events for Users
    event UserCreated(address user_address, string name,Role role);
    event UserRemoved(address user_address);

    // events for Shipments
    event ShipmentCreated(uint256 shipment_id, address origin, address destination, uint256 date_of_departure,uint256 expected_date_of_arrival, uint256 product_id);

    // events for Products
    event ProductCreated(uint256 id, string name, uint256 quantity, address currentScEntity);
    event ProductRemoved(uint256 id);

    // events for ScEntities
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

        address addr = 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2;
        create_ScEntity(addr,"Supplier 0", EntityType.Supplier);
        create_ScEntity(0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db,"Transportation 1", EntityType.Transportation);
        create_ScEntity(0x78731D3Ca6b7E34aC0F824c42a7cC18A495cabaB,"Warehouse_Logistic 3", EntityType.Warehouse_Logistic);

        create_product("Depon", 10 , addr);
        create_product("Ponstan", 10 , addr);
        create_product("Amoxil", 10 , addr);
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
    
    function remove_user(address user_address) public only_for_role(Role.Admin) {                                                                                 
        require(users[user_address].user_address == user_address,"User does not exist!");
        require(msg.sender != user_address,"Admin can't remove himself!");

        delete users[user_address];
        
        emit UserRemoved(user_address);
    }

    function view_user(address user_address) public view returns (User memory) {
        require(users[user_address].user_address == user_address,"User does not exist!");

        return users[user_address];
    }

    // Shipment Management
    function create_shipment(address destination, uint256 product_id, uint256 expected_date_of_arrival) {
        require(block.timestamp < expected_date_of_arrival,"Expected date of arrival should be after date of departure!");

        uint256 p_index = products_index[product_id];
        require(p_index != 0 || products_list[0].id == product_id,"Product does not exist!");

        uint256 destination_index = scEntities_index[destination];
        require(destination_index < scEntities_list.length && scEntities_list[destination_index].entity_address == destination, "Entity does not exist!");

        Product memory product = products_list[p_index];

        uint256 origin_index = scEntities_index[product.currentScEntity];
        require(uint256(scEntities_list[destination_index].entityType) > 0 && uint256(scEntities_list[origin_index].entityType) == uint256(scEntities_list[destination_index].entityType) - 1 , "Wrong destination!");

        Shipment memory newShipment = Shipment({
            shipment_id: shipments_list.length,
            origin: product.currentScEntity,
            destination: destination,
            date_of_departure: block.timestamp,
            expected_date_of_arrival: expected_date_of_arrival,
            product_id: product_id
        });

        products_list[p_index].currentScEntity = destination;
        shipments_list.push(newShipment);
        emit ShipmentCreated(newShipment.shipment_id, newShipment.origin, newShipment.destination, newShipment.date_of_departure, newShipment.expected_date_of_arrival,  newShipment.product_id);
    }

    function get_shipment(uint256 shipment_id) public view returns (Shipment memory) {
        require(shipment_id < shipments_list.length,"Shipment does not exist!");

        return shipments_list[shipment_id];
    }

    function get_shipments() public view returns (Shipment[] memory) {
        return shipments_list;
    }

    function set_expected_date_of_arrival(uint256 shipment_id) public {
        shipments_list[shipment_id].expected_date_of_arrival = block.timestamp;
    }

    // Product Management
    function create_product(string memory name, uint256 quantity, address currentScEntity) public {
        uint256 index = scEntities_index[currentScEntity];
        require(index < scEntities_list.length && scEntities_list[index].entity_address == currentScEntity, "Cannot create product because Entity does not exist!");

        Product memory newProduct = Product({
            id: products_ids++,
            name: name,
            quantity: quantity,
            currentScEntity: currentScEntity
        }); 
        
        products_index[newProduct.id] = products_list.length;
        products_list.push(newProduct);
        emit ProductCreated(newProduct.id, newProduct.name, newProduct.quantity, newProduct.currentScEntity);
    }

    function remove_product(uint256 id) public {                                                                                 
        /**
        * @dev Function to add a new Supply Chain Entity. Can only be called by an admin user. 
        *
        * @param entity_address The address of the new Supply Chain Entity.
        * @param name The name of the new Supply Chain Entity.
        * @param entityType The type of the new Supply Chain Entity (Supplier, Transportation, Manufacturer, Warehouse/Logistic, Distributor, Pharmacy).
        */
        require(products_index[id] != 0 || products_list[0].id == id,"Product does not exist!");

        uint256 index = products_index[id];
        products_list[index] = products_list[products_list.length - 1];

        products_index[products_list[index].id] = index;
        delete products_index[id];
        
        products_list.pop();

        emit ProductRemoved(id);
    }

    function get_product(uint256 id) public view returns (Product memory) {
        require(products_index[id] != 0 || products_list[0].id == id,"Product does not exist!");

        return products_list[products_index[id]];
    }

    function get_products() public view returns (Product[] memory) {
        return products_list;
    }

    function get_product_entity(uint256 id) public view returns (ScEntity memory) {
        require(products_index[id] != 0 || products_list[0].id == id,"Product does not exist!");

        return get_ScEntity(products_list[products_index[id]].currentScEntity);
    }

    // scEntities (Supply Chain Entities) Management
    function create_ScEntity(address entity_address, string memory name, EntityType entityType) public only_for_role(Role.Admin) {
        require(scEntities_index[entity_address] == 0 && (scEntities_list.length == 0 || scEntities_list[scEntities_index[entity_address]].entity_address != entity_address), "Entity already exists!");

        ScEntity memory newScEntity = ScEntity({
            entity_address: entity_address,
            name: name,
            entityType: entityType
        }); 
        
        scEntities_index[entity_address] = scEntities_list.length;
        scEntities_list.push(newScEntity);

        emit ScEntityCreated(newScEntity.entity_address, newScEntity.name, newScEntity.entityType);
    }

    function remove_ScEntity(address entity_address) public only_for_role(Role.Admin) {
        uint256 index = scEntities_index[entity_address];
        require(index < scEntities_list.length && scEntities_list[index].entity_address == entity_address, "Entity does not exist!");

        if (index != scEntities_list.length - 1) {
            scEntities_list[index] = scEntities_list[scEntities_list.length - 1];
            scEntities_index[scEntities_list[index].entity_address] = index;
        }

        scEntities_list.pop();
        delete scEntities_index[entity_address];

        emit ScEntityRemoved(entity_address);
    }

    function get_ScEntity(address entity_address) public view returns (ScEntity memory) {
        uint256 index = scEntities_index[entity_address];
        require(index < scEntities_list.length && scEntities_list[index].entity_address == entity_address, "Entity does not exist!");

        return scEntities_list[index];
    }

    function get_ScEntities() public view returns (ScEntity[] memory) {
        return scEntities_list;
    }
}
