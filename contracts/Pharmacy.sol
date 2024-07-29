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
        EntityType entity_type;
    }

    struct User {
        address user_address;
        string name;
        Role role;
    }

    mapping(address => User) public users;
    mapping(address => uint256) public scEntities_index;
    mapping(uint256 => uint256) public products_index;
    mapping(address => uint256[]) public entities_products;
    mapping(uint256 => uint256[]) public products_shipments;

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
    event ScEntityCreated(address entity_address, string name, EntityType entity_type);
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

        uint256 entityIndex = scEntities_index[user_address];
        if (entityIndex < scEntities_list.length && scEntities_list[entityIndex].entity_address == user_address) {
            EntityType entityType = scEntities_list[entityIndex].entity_type;
            if (entityType == EntityType.Supplier) {
                require(role == Role.Supplier, "User role must be Supplier for Supplier entity");
            } else if (entityType == EntityType.Warehouse_Logistic) {
                require(role == Role.Logistic, "User role must be Logistic for Warehouse Logistic entity");
            } else {
                require(role != Role.Supplier && role != Role.Logistic, "Invalid role for this entity");
            }
        }

        User memory newUser = User({
            user_address: user_address,
            name: name,
            role: role
        });
        users[user_address] = newUser;

        emit UserCreated(newUser.user_address,newUser.name,newUser.role);
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
    function create_shipment(address destination, uint256 product_id, uint256 expected_date_of_arrival) public {
        require(block.timestamp < expected_date_of_arrival,"Expected date of arrival should be after date of departure!");

        uint256 p_index = products_index[product_id];
        require(p_index != 0 || products_list[0].id == product_id,"Product does not exist!");

        uint256 destination_index = scEntities_index[destination];
        require(destination_index < scEntities_list.length && scEntities_list[destination_index].entity_address == destination, "Entity does not exist!");

        Product memory product = products_list[p_index];

        uint256 origin_index = scEntities_index[product.currentScEntity];
        require(uint256(scEntities_list[destination_index].entity_type) > 0 && uint256(scEntities_list[origin_index].entity_type) == uint256(scEntities_list[destination_index].entity_type) - 1 , "Wrong destination!");

        Shipment memory newShipment = Shipment({
            shipment_id: shipments_list.length,
            origin: product.currentScEntity,
            destination: destination,
            date_of_departure: block.timestamp,
            expected_date_of_arrival: expected_date_of_arrival,
            product_id: product_id
        });

        // Save shipment to list for this product
        products_shipments[product_id].push(newShipment.shipment_id);

        // Adds product_id to Logistic employee (if entity is a Logistic warehouse )
        if( scEntities_list[destination_index].entity_type == EntityType.Warehouse_Logistic ){
            entities_products[destination].push(product_id);
        }

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

    function get_product_shipments(uint256 product_id) public view returns (Shipment[] memory) {
        require(products_list.length > 0, "Product does not exist!");
        require(products_index[product_id] != 0 || products_list[0].id == product_id, "Product does not exist!");

        User memory user = users[msg.sender];
        uint256[] memory shipment_ids = products_shipments[product_id];

        if( user.role == Role.Supplier || user.role == Role.Logistic){
            bool product_belongs_to_user = false;
            uint256[] memory user_products = entities_products[msg.sender];
            for (uint256 i = 0; i < user_products.length; i++) {
                if (user_products[i] == product_id) {
                    product_belongs_to_user = true;
                    break;
                }
            }
            require(product_belongs_to_user, "Product does not belong to the user");
        
            uint256 max_shipments = user.role == Role.Supplier ? 2 : 3;
            uint256 shipment_count = shipment_ids.length < max_shipments ? shipment_ids.length : max_shipments;

            Shipment[] memory _shipments = new Shipment[](shipment_count);
            for (uint256 i = 0; i < shipment_count; i++) {
                _shipments[i] = shipments_list[shipment_ids[i]];
            }

            return _shipments;
        }

        Shipment[] memory shipments = new Shipment[](shipment_ids.length);
        for (uint256 i = 0; i < shipment_ids.length; i++) {
            shipments[i] = shipments_list[shipment_ids[i]];
        }

        return shipments;
    }

    // Product Management
    function create_product(string memory name, uint256 quantity, address currentScEntity) public {
        uint256 index = scEntities_index[currentScEntity];
        require(index < scEntities_list.length && scEntities_list[index].entity_address == currentScEntity, "Cannot create product because Entity does not exist!");
        require(scEntities_list[index].entity_type == EntityType.Supplier, "Cannot create product because Entity is not a Supplier!");

        Product memory newProduct = Product({
            id: products_ids++,
            name: name,
            quantity: quantity,
            currentScEntity: currentScEntity
        }); 
        
        products_index[newProduct.id] = products_list.length;
        products_list.push(newProduct);

        // adds product to supplier
        entities_products[currentScEntity].push(newProduct.id);

        emit ProductCreated(newProduct.id, newProduct.name, newProduct.quantity, newProduct.currentScEntity);
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

    function get_product(uint256 id) public view returns (Product memory) {
        require(products_index[id] != 0 || products_list[0].id == id,"Product does not exist!");
        if( users[msg.sender].role == Role.Supplier || users[msg.sender].role == Role.Logistic){
            for(uint256 i=0; i < entities_products[msg.sender].length ; i++ ){
                if(products_list[products_index[entities_products[msg.sender][i]]].id == id){
                    return products_list[products_index[id]];
                }
            }

            require(false,"Product does not exist!");
        }

        return products_list[products_index[id]];
    }

    function get_products() public view returns (Product[] memory) {
        if( users[msg.sender].role == Role.Supplier || users[msg.sender].role == Role.Logistic){
            Product[] memory _products_list = new Product[](entities_products[msg.sender].length);

            for(uint256 i=0; i < entities_products[msg.sender].length ; i++ ){
                _products_list[i] = products_list[products_index[entities_products[msg.sender][i]]];
            }

            return _products_list;
        }
        return products_list;
    }

    function get_product_entity(uint256 id) public view returns (ScEntity memory) {
        require(products_index[id] != 0 || products_list[0].id == id,"Product does not exist!");
        
        if( users[msg.sender].role == Role.Supplier || users[msg.sender].role == Role.Logistic){
            for(uint256 i=0; i < entities_products[msg.sender].length ; i++ ){
                if(products_list[products_index[entities_products[msg.sender][i]]].id == id){
                    return get_ScEntity(products_list[products_index[id]].currentScEntity);
                }
            }
            require(false,"Product does not exist!");
        }

        return get_ScEntity(products_list[products_index[id]].currentScEntity);
    }

    // scEntities (Supply Chain Entities) Management
    function create_ScEntity(address entity_address, string memory name, EntityType entity_type) public only_for_role(Role.Admin) {
        require(scEntities_index[entity_address] == 0 && (scEntities_list.length == 0 || scEntities_list[scEntities_index[entity_address]].entity_address != entity_address), "Entity already exists!");

        // Check if address belongs to an existing user
        if (users[entity_address].user_address == entity_address) {
            Role userRole = users[entity_address].role;
            
            // If user role is Supplier, entity type must be Supplier
            if (userRole == Role.Supplier) {
                require(entity_type == EntityType.Supplier, "Entity type must be Supplier for Supplier role");
            }
            // If user role is Logistic, entity type must be Warehouse Logistic
            else if (userRole == Role.Logistic) {
                require(entity_type == EntityType.Warehouse_Logistic, "Entity type must be Warehouse Logistic for Logistic role");
            }
            // If user role is Admin or Auditor, entity cannot be created
            else if (userRole == Role.Admin || userRole == Role.Auditor) {
                revert("Cannot create entity with Admin or Auditor role address");
            }
        }

        ScEntity memory newScEntity = ScEntity({
            entity_address: entity_address,
            name: name,
            entity_type: entity_type
        }); 
        
        scEntities_index[entity_address] = scEntities_list.length;
        scEntities_list.push(newScEntity);

        emit ScEntityCreated(newScEntity.entity_address, newScEntity.name, newScEntity.entity_type);
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
