// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

contract Pharmacy{
    enum Role {Admin, Supplier, Logistic, Auditor}

    struct Shipment{
        uint256 shipment_id;
        uint256 origin;
        uint256 destination;
        uint256 date_of_departure;
        uint256 date_of_arrival;
        uint256[] products;         // list of products ids
        uint256[] products_quantity;  // list for each product number of pieces
    }

    struct User{
        address user_address;
        string name;
        Role role;
    }

    mapping(uint256 => Shipment) public shipments;
    Shipment[] public shipments_list;
    
    mapping(address => User) public users;

    modifier only_admin() {
        require(users[msg.sender].role == Role.Admin, "Only admins");
        _;
    }

    constructor() {
        create_user("Admin",Role.Admin, msg.sender);
    }


    function create_user(string memory name, Role role, address user_address) public only_admin {
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

    event ShipmentCreated(uint256 shipment_id, uint256 origin, uint256 destination, uint256 date_of_departure, uint256[] products, uint256[] products_quantity);

    // we need a script to do the shipment part

    function create_shipment(uint256 origin, uint256 destination,uint256[] memory products, uint256[] memory products_quantity  ) public {
        Shipment memory newShipment = Shipment({
            shipment_id : shipments_list.length,
            origin : origin,
            destination : destination,
            products : products,
            products_quantity: products_quantity,
            date_of_departure : block.timestamp,
            date_of_arrival : 0
        });

        shipments[shipments_list.length] = newShipment;
        shipments_list.push(newShipment);
        emit ShipmentCreated(newShipment.shipment_id, newShipment.origin, newShipment.destination, newShipment.date_of_departure, newShipment.products,newShipment.products_quantity);
    }


    function get_shipment(uint _i) public view returns (Shipment memory) {
        return shipments[_i];
    }

    function get_shipments() public view returns (Shipment[] memory){
        return shipments_list;
    }

    function set_date_of_arrival(uint256 shipment_id) public {
        shipments[shipment_id].date_of_arrival = block.timestamp;
    }

}
