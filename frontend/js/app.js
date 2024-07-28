const web3 = new Web3('http://127.0.0.1:8545/'); // Change to your node URL
let accounts = [];
let users = {};
let contractABI;
let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
let contract;
let currentUserAddress;

// Role enum mapping
const Role = {
  Admin: 0,
  Supplier: 1,
  Logistic: 2,
  Auditor: 3,
};

const EntityTypeString = {
  0: 'Supplier',
  1: 'Transportation',
  2: 'Manufacturer',
  3: 'Warehouse_Logistic',
  4: 'Distributor',
  5: 'Pharmacy'
};

// You can also create the reverse mapping if needed
const EntityType = {
  Supplier: 0,
  Transportation: 1,
  Manufacturer: 2,
  Warehouse_Logistic: 3,
  Distributor: 4,
  Pharmacy: 5
};

// Example usage: getting the name of the entity type
console.log(EntityType[0]); // Outputs: Supplier
console.log(EntityType[3]); // Outputs: Warehouse_Logistic

async function getAccounts() {
    try {
        // Get all accounts
        accounts = await web3.eth.getAccounts();
        
        const accountDropdown = document.getElementById('accountDropdown');
        accounts.forEach(account => {
            const option = document.createElement('option');
            option.value = account;
            option.text = account;
            accountDropdown.appendChild(option);
        });

        currentUserAddress = accounts[0];
        console.log('Accounts:', accounts);
    } catch (error) {
        console.error('Error fetching accounts:', error);
    }
}

async function init(){
  try {
    await getAccounts();

    const response = await fetch('../artifacts/contracts/Pharmacy.sol/Pharmacy.json');
    const contractJson = await response.json();
    contractABI = contractJson.abi;
    // contractAddress = accounts[0];

    contract = new web3.eth.Contract(contractABI, contractAddress);

    // Read the users.json file
    const rawData = await fetch('objects/users.json');
    const usersData = await rawData.json();

    // Create the users array with addresses from accounts
    users = usersData.map((user, index) => ({
      name: user.name,
      role: user.role,
      address: accounts[index] // Assuming the first account is the deployer
    }));

    const admin = await contract.methods.view_user(currentUserAddress).call({ from: accounts[0] });

    // creates first user
    users[0] = {
      "name" : admin.name,
      "role" : admin.role,
      "address": accounts[0],
    }

    for(let i=1; i<4; i++){
      await contract.methods.create_user(users[i]["name"], users[i]["role"], users[i]["address"]).send({ from: accounts[0] });
    } 
  } catch (error) {
    console.log(error);
  }
}

async function get_users() {
  for(let i=0; i<4; i++){
    let user = await contract.methods.view_user(accounts[i]).call({ from: currentUserAddress });
    users[i] = {
      "name" : user.name,
      "role" : user.role,
      "address": accounts[i],
    }
  }

  const userDropdown = document.getElementById('userDropdown');
  users.forEach(user => {
    const option = document.createElement('option');
    option.value = user.address;
    option.text = user.name;
    if(user.address == currentUserAddress){
      option.selected = true;
    }
    userDropdown.appendChild(option);
  });

  const selectedAddress = userDropdown.value;
  const userAddressDiv = document.getElementById('selectedUserAddress');
  userAddressDiv.innerText = `Address: ${selectedAddress}`;
}

// Ensure this is called after users are populated in the init function
init().then(get_users);
