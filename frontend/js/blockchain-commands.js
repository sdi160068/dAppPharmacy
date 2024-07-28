async function createUser() {
    const name = document.getElementById('userName').value;
    const role = document.getElementById('userRole').value;
    const address = document.getElementById('userAddress').value;

    const accounts = await web3.eth.getAccounts();
    await contract.methods.create_user(name, role, address).send({ from: accounts[0] });
}

async function createProduct() {
    const name = document.getElementById('productName').value;
    const quantity = document.getElementById('productQuantity').value;
    const entityAddress = document.getElementById('productEntityAddress').value;

    const accounts = await web3.eth.getAccounts();
    await contract.methods.create_product(name, quantity, entityAddress).send({ from: accounts[0] });
}

async function createShipment() {
    const destination = document.getElementById('shipmentDestination').value;
    const productId = document.getElementById('shipmentProductId').value;
    const arrivalDate = document.getElementById('shipmentArrivalDate').value;

    const accounts = await web3.eth.getAccounts();
    await contract.methods.create_shipment(destination, productId, arrivalDate).send({ from: accounts[0] });
}

// document.getElementById('getEntities').addEventListener('click', async () => {
async function getEntities() {
    showLoadingCircle();
    try {
        const entities = await contract.methods.get_ScEntities().call({ from: contractAddress});
        const entityList = document.getElementById('entityList');
        entityList.innerHTML = '';


        if( entities.length === 0 ){
          const listItem = document.createElement('li');
          listItem.textContent = `Entities list is empty.`;
          entityList.appendChild(listItem);
        }

        entities.forEach(entity => {
            const listItem = document.createElement('li');
            listItem.textContent = `Address: ${entity.entity_address}, Name: ${entity.name}, Type: ${entity.entity_type}`;
            entityList.appendChild(listItem);
        });

    } catch (error) {
        console.error('Error fetching entities', error);
    } finally{
        hideLoadingCircle();
    }
}

async function viewUser() {
    showLoadingCircle();
    // The user's Ethereum address
    const userAddress = document.getElementById("user_user_address").value;
    console.log(userAddress);

    try {
        const user = await contract.methods.view_user(userAddress).call({ from: accounts[0] });
        // const entities = await contract.methods.get_ScEntities().call({ from: contractAddress});


        // Display the user information
        document.getElementById("userInfo").innerText = `
            Name: ${user.name}
            Role: ${user.role}
            Address: ${user.user_address}
        `;
    } catch (error) {
        console.error(error);
        const errorMessage = error.message.includes("reverted") ? error.message.split('reverted ')[1] : "An unknown error occurred";
        document.getElementById('userInfo').innerText = errorMessage;
    } finally{
        hideLoadingCircle();
    }
}
