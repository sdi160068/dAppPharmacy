const web3 = new Web3('http://127.0.0.1:8545/'); // Change to your node URL
let accounts = [];
let contractABI;
let contractAddress = "0x4A679253410272dd5232B3Ff7cF5dbB88f295319";
let contract;

// Role enum mapping
const Role = {
  Admin: 0,
  Supplier: 1,
  Logistic: 2,
  Auditor: 3,
};

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

        console.log('Accounts:', accounts);
    } catch (error) {
        console.error('Error fetching accounts:', error);
    }
}

async function init(){
  await getAccounts();

  const response = await fetch('../artifacts/contracts/Pharmacy.sol/Pharmacy.json');
  const contractJson = await response.json();
  contractABI = contractJson.abi;
  // contractAddress = accounts[0];

  contract = new web3.eth.Contract(contractABI, contractAddress);

  await contract.methods.create_user("Supplier 0", Role.Supplier, accounts[1]).send({ from: accounts[0] });
  await contract.methods.create_user("Logistic 1", Role.Logistic, accounts[2]).send({ from: accounts[0] });
  await contract.methods.create_user("Auditor", Role.Auditor, accounts[3]).send({ from: accounts[0] });
}

init();

// window.addEventListener('load', async () => {
//     if (typeof window.ethereum !== 'undefined') {
//         web3 = new Web3(window.ethereum);
//         try {
//             accounts = await ethereum.request({ method: 'eth_requestAccounts' });
//             contract = new web3.eth.Contract(contractABI, contractAddress);
//         } catch (error) {
//             console.error('User denied account access', error);
//         }
//     } else {
//         console.warn('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
//     }

//     document.getElementById('connectWallet').addEventListener('click', async () => {
//         accounts = await ethereum.request({ method: 'eth_requestAccounts' });
//         console.log('Connected accounts:', accounts);
//     });

// });
