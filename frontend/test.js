
// generate a new random account
const account = web3.eth.accounts.create();

console.log(account);
/* ↳
{
  address: '0x9E82491d1978217d631a3b467BF912933F54788f',
  privateKey: '<redacted>',
  signTransaction: [Function: signTransaction],
  sign: [Function: sign],
  encrypt: [Function: encrypt]
}
*/

// use the account to sign a message
const signature = account.sign("Hello, Web3.js!");
/*  ↳ 
{
  message: 'Hello, Web3.js!',
  messageHash: '0xc0f5f7ee704f1473acbb7959f5f925d787a9aa76dccc1b4914cbe77c09fd68d5',
  v: '0x1b',
  r: '0x129822b685d4404924a595af66c9cdd6367a57c66ac66e2e10fd9915d4772fbd',
  s: '0x62db48d6f5e47fe87c64a0991d6d94d23b6024d5d8335348f6686b8c46edb1e9',
  signature: '0x129822b685d4404924a595af66c9cdd6367a57c66ac66e2e10fd9915d4772fbd62db48d6f5e47fe87c64a0991d6d94d23b6024d5d8335348f6686b8c46edb1e91b'
}
*/

// const contractAddress = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266';
// const contractABI = [
//     {
//       "inputs": [],
//       "stateMutability": "nonpayable",
//       "type": "constructor"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "id",
//           "type": "uint256"
//         },
//         {
//           "indexed": false,
//           "internalType": "string",
//           "name": "name",
//           "type": "string"
//         },
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "quantity",
//           "type": "uint256"
//         },
//         {
//           "indexed": false,
//           "internalType": "address",
//           "name": "currentScEntity",
//           "type": "address"
//         }
//       ],
//       "name": "ProductCreated",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "id",
//           "type": "uint256"
//         }
//       ],
//       "name": "ProductRemoved",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": false,
//           "internalType": "address",
//           "name": "entity_address",
//           "type": "address"
//         },
//         {
//           "indexed": false,
//           "internalType": "string",
//           "name": "name",
//           "type": "string"
//         },
//         {
//           "indexed": false,
//           "internalType": "enum Pharmacy.EntityType",
//           "name": "entity_type",
//           "type": "uint8"
//         }
//       ],
//       "name": "ScEntityCreated",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": false,
//           "internalType": "address",
//           "name": "entity_address",
//           "type": "address"
//         }
//       ],
//       "name": "ScEntityRemoved",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "shipment_id",
//           "type": "uint256"
//         },
//         {
//           "indexed": false,
//           "internalType": "address",
//           "name": "origin",
//           "type": "address"
//         },
//         {
//           "indexed": false,
//           "internalType": "address",
//           "name": "destination",
//           "type": "address"
//         },
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "date_of_departure",
//           "type": "uint256"
//         },
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "expected_date_of_arrival",
//           "type": "uint256"
//         },
//         {
//           "indexed": false,
//           "internalType": "uint256",
//           "name": "product_id",
//           "type": "uint256"
//         }
//       ],
//       "name": "ShipmentCreated",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": false,
//           "internalType": "address",
//           "name": "user_address",
//           "type": "address"
//         },
//         {
//           "indexed": false,
//           "internalType": "string",
//           "name": "name",
//           "type": "string"
//         },
//         {
//           "indexed": false,
//           "internalType": "enum Pharmacy.Role",
//           "name": "role",
//           "type": "uint8"
//         }
//       ],
//       "name": "UserCreated",
//       "type": "event"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": false,
//           "internalType": "address",
//           "name": "user_address",
//           "type": "address"
//         }
//       ],
//       "name": "UserRemoved",
//       "type": "event"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "entity_address",
//           "type": "address"
//         },
//         {
//           "internalType": "string",
//           "name": "name",
//           "type": "string"
//         },
//         {
//           "internalType": "enum Pharmacy.EntityType",
//           "name": "entity_type",
//           "type": "uint8"
//         }
//       ],
//       "name": "create_ScEntity",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "string",
//           "name": "name",
//           "type": "string"
//         },
//         {
//           "internalType": "uint256",
//           "name": "quantity",
//           "type": "uint256"
//         },
//         {
//           "internalType": "address",
//           "name": "currentScEntity",
//           "type": "address"
//         }
//       ],
//       "name": "create_product",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "destination",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "product_id",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "expected_date_of_arrival",
//           "type": "uint256"
//         }
//       ],
//       "name": "create_shipment",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "string",
//           "name": "name",
//           "type": "string"
//         },
//         {
//           "internalType": "enum Pharmacy.Role",
//           "name": "role",
//           "type": "uint8"
//         },
//         {
//           "internalType": "address",
//           "name": "user_address",
//           "type": "address"
//         }
//       ],
//       "name": "create_user",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "name": "entities_products",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "get_ScEntities",
//       "outputs": [
//         {
//           "components": [
//             {
//               "internalType": "address",
//               "name": "entity_address",
//               "type": "address"
//             },
//             {
//               "internalType": "string",
//               "name": "name",
//               "type": "string"
//             },
//             {
//               "internalType": "enum Pharmacy.EntityType",
//               "name": "entity_type",
//               "type": "uint8"
//             }
//           ],
//           "internalType": "struct Pharmacy.ScEntity[]",
//           "name": "",
//           "type": "tuple[]"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "entity_address",
//           "type": "address"
//         }
//       ],
//       "name": "get_ScEntity",
//       "outputs": [
//         {
//           "components": [
//             {
//               "internalType": "address",
//               "name": "entity_address",
//               "type": "address"
//             },
//             {
//               "internalType": "string",
//               "name": "name",
//               "type": "string"
//             },
//             {
//               "internalType": "enum Pharmacy.EntityType",
//               "name": "entity_type",
//               "type": "uint8"
//             }
//           ],
//           "internalType": "struct Pharmacy.ScEntity",
//           "name": "",
//           "type": "tuple"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "id",
//           "type": "uint256"
//         }
//       ],
//       "name": "get_product",
//       "outputs": [
//         {
//           "components": [
//             {
//               "internalType": "uint256",
//               "name": "id",
//               "type": "uint256"
//             },
//             {
//               "internalType": "string",
//               "name": "name",
//               "type": "string"
//             },
//             {
//               "internalType": "uint256",
//               "name": "quantity",
//               "type": "uint256"
//             },
//             {
//               "internalType": "address",
//               "name": "currentScEntity",
//               "type": "address"
//             }
//           ],
//           "internalType": "struct Pharmacy.Product",
//           "name": "",
//           "type": "tuple"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "id",
//           "type": "uint256"
//         }
//       ],
//       "name": "get_product_entity",
//       "outputs": [
//         {
//           "components": [
//             {
//               "internalType": "address",
//               "name": "entity_address",
//               "type": "address"
//             },
//             {
//               "internalType": "string",
//               "name": "name",
//               "type": "string"
//             },
//             {
//               "internalType": "enum Pharmacy.EntityType",
//               "name": "entity_type",
//               "type": "uint8"
//             }
//           ],
//           "internalType": "struct Pharmacy.ScEntity",
//           "name": "",
//           "type": "tuple"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "product_id",
//           "type": "uint256"
//         }
//       ],
//       "name": "get_product_shipments",
//       "outputs": [
//         {
//           "components": [
//             {
//               "internalType": "uint256",
//               "name": "shipment_id",
//               "type": "uint256"
//             },
//             {
//               "internalType": "address",
//               "name": "origin",
//               "type": "address"
//             },
//             {
//               "internalType": "address",
//               "name": "destination",
//               "type": "address"
//             },
//             {
//               "internalType": "uint256",
//               "name": "date_of_departure",
//               "type": "uint256"
//             },
//             {
//               "internalType": "uint256",
//               "name": "expected_date_of_arrival",
//               "type": "uint256"
//             },
//             {
//               "internalType": "uint256",
//               "name": "product_id",
//               "type": "uint256"
//             }
//           ],
//           "internalType": "struct Pharmacy.Shipment[]",
//           "name": "",
//           "type": "tuple[]"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "get_products",
//       "outputs": [
//         {
//           "components": [
//             {
//               "internalType": "uint256",
//               "name": "id",
//               "type": "uint256"
//             },
//             {
//               "internalType": "string",
//               "name": "name",
//               "type": "string"
//             },
//             {
//               "internalType": "uint256",
//               "name": "quantity",
//               "type": "uint256"
//             },
//             {
//               "internalType": "address",
//               "name": "currentScEntity",
//               "type": "address"
//             }
//           ],
//           "internalType": "struct Pharmacy.Product[]",
//           "name": "",
//           "type": "tuple[]"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "shipment_id",
//           "type": "uint256"
//         }
//       ],
//       "name": "get_shipment",
//       "outputs": [
//         {
//           "components": [
//             {
//               "internalType": "uint256",
//               "name": "shipment_id",
//               "type": "uint256"
//             },
//             {
//               "internalType": "address",
//               "name": "origin",
//               "type": "address"
//             },
//             {
//               "internalType": "address",
//               "name": "destination",
//               "type": "address"
//             },
//             {
//               "internalType": "uint256",
//               "name": "date_of_departure",
//               "type": "uint256"
//             },
//             {
//               "internalType": "uint256",
//               "name": "expected_date_of_arrival",
//               "type": "uint256"
//             },
//             {
//               "internalType": "uint256",
//               "name": "product_id",
//               "type": "uint256"
//             }
//           ],
//           "internalType": "struct Pharmacy.Shipment",
//           "name": "",
//           "type": "tuple"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "get_shipments",
//       "outputs": [
//         {
//           "components": [
//             {
//               "internalType": "uint256",
//               "name": "shipment_id",
//               "type": "uint256"
//             },
//             {
//               "internalType": "address",
//               "name": "origin",
//               "type": "address"
//             },
//             {
//               "internalType": "address",
//               "name": "destination",
//               "type": "address"
//             },
//             {
//               "internalType": "uint256",
//               "name": "date_of_departure",
//               "type": "uint256"
//             },
//             {
//               "internalType": "uint256",
//               "name": "expected_date_of_arrival",
//               "type": "uint256"
//             },
//             {
//               "internalType": "uint256",
//               "name": "product_id",
//               "type": "uint256"
//             }
//           ],
//           "internalType": "struct Pharmacy.Shipment[]",
//           "name": "",
//           "type": "tuple[]"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "name": "products_index",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "name": "products_list",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "id",
//           "type": "uint256"
//         },
//         {
//           "internalType": "string",
//           "name": "name",
//           "type": "string"
//         },
//         {
//           "internalType": "uint256",
//           "name": "quantity",
//           "type": "uint256"
//         },
//         {
//           "internalType": "address",
//           "name": "currentScEntity",
//           "type": "address"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "name": "products_shipments",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "entity_address",
//           "type": "address"
//         }
//       ],
//       "name": "remove_ScEntity",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "id",
//           "type": "uint256"
//         }
//       ],
//       "name": "remove_product",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "user_address",
//           "type": "address"
//         }
//       ],
//       "name": "remove_user",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "",
//           "type": "address"
//         }
//       ],
//       "name": "scEntities_index",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "name": "scEntities_list",
//       "outputs": [
//         {
//           "internalType": "address",
//           "name": "entity_address",
//           "type": "address"
//         },
//         {
//           "internalType": "string",
//           "name": "name",
//           "type": "string"
//         },
//         {
//           "internalType": "enum Pharmacy.EntityType",
//           "name": "entity_type",
//           "type": "uint8"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "shipment_id",
//           "type": "uint256"
//         }
//       ],
//       "name": "set_expected_date_of_arrival",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "name": "shipments_list",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "shipment_id",
//           "type": "uint256"
//         },
//         {
//           "internalType": "address",
//           "name": "origin",
//           "type": "address"
//         },
//         {
//           "internalType": "address",
//           "name": "destination",
//           "type": "address"
//         },
//         {
//           "internalType": "uint256",
//           "name": "date_of_departure",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "expected_date_of_arrival",
//           "type": "uint256"
//         },
//         {
//           "internalType": "uint256",
//           "name": "product_id",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "",
//           "type": "address"
//         }
//       ],
//       "name": "users",
//       "outputs": [
//         {
//           "internalType": "address",
//           "name": "user_address",
//           "type": "address"
//         },
//         {
//           "internalType": "string",
//           "name": "name",
//           "type": "string"
//         },
//         {
//           "internalType": "enum Pharmacy.Role",
//           "name": "role",
//           "type": "uint8"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "user_address",
//           "type": "address"
//         }
//       ],
//       "name": "view_user",
//       "outputs": [
//         {
//           "components": [
//             {
//               "internalType": "address",
//               "name": "user_address",
//               "type": "address"
//             },
//             {
//               "internalType": "string",
//               "name": "name",
//               "type": "string"
//             },
//             {
//               "internalType": "enum Pharmacy.Role",
//               "name": "role",
//               "type": "uint8"
//             }
//           ],
//           "internalType": "struct Pharmacy.User",
//           "name": "",
//           "type": "tuple"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     }
//   ];

// let web3;
// let contract;

// window.addEventListener('load', async () => {
//     if (window.ethereum) {
//         web3 = new Web3(window.ethereum);
//         await window.ethereum.enable();
//     } else {
//         alert('Please install MetaMask to use this dApp!');
//         return;
//     }

//     contract = new web3.eth.Contract(contractABI, contractAddress);
// });

// async function createUser() {
//     const name = document.getElementById('userName').value;
//     const role = document.getElementById('userRole').value;
//     const address = document.getElementById('userAddress').value;

//     const accounts = await web3.eth.getAccounts();
//     await contract.methods.create_user(name, role, address).send({ from: accounts[0] });
// }

// async function createProduct() {
//     const name = document.getElementById('productName').value;
//     const quantity = document.getElementById('productQuantity').value;
//     const entityAddress = document.getElementById('productEntityAddress').value;

//     const accounts = await web3.eth.getAccounts();
//     await contract.methods.create_product(name, quantity, entityAddress).send({ from: accounts[0] });
// }

// async function createShipment() {
//     const destination = document.getElementById('shipmentDestination').value;
//     const productId = document.getElementById('shipmentProductId').value;
//     const arrivalDate = document.getElementById('shipmentArrivalDate').value;

//     const accounts = await web3.eth.getAccounts();
//     await contract.methods.create_shipment(destination, productId, arrivalDate).send({ from: accounts[0] });
// }
