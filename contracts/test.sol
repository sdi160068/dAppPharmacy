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
//             (users[msg.sender].role == Role.Supplier && products[product_id].current_location == "Manufacturer" ||
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

// shipment 1[ product A]
// shipment 2[ product A]
// shipment 3[ product A]
// shipment 4[ product A]
// shipment 5[ product A]
// shipment 6[ product A]

// function get_product_shipments(uint256 product_id){
//     Shipment[] shimpents_of_product = [];
//     for( int i=0; i< shipments_list.length; i++){
//         shipment = shipments_list[i];
//         for( int j=0; j < shipment.products.length; j++ ){
//             product = shipment.products[j];
//             if (product.id == id ){
//                 if (shipment.currentLocation.entityType == Warehouse_Logistic &&  user role == Supplier){
//                     return shimpents_of_product;
//                 }
//                 else if (shipment.currentLocation.entityType == Distributor &&  user role == Logistic Employee){
//                     return shimpents_of_product;
//                 }
//                 shimpents_of_product.push(shipment);
//             }
//         }
//     }

//     return shimpents_of_product;
// }