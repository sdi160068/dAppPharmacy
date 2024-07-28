async function createUser() {
    showLoadingCircle();

    try {
        const name = document.getElementById('userName').value;
        const role = document.getElementById('userRole').value;
        const address = document.getElementById('userAddress').value;

        await contract.methods.create_user(name, role, address).send({ from: currentUserAddress });
    } catch (error) {
        console.log(error);
        alert(error.cause); 
    } finally{
        hideLoadingCircle();
    }
}

async function removeUser() {
    showLoadingCircle();

    try {     
        const userAddress = document.getElementById('removeUserAddress').value;
        await contract.methods.remove_user(userAddress).send({ from: currentUserAddress });
    } catch (error) {
        console.log(error);
        alert(error.cause); 
    } finally{
        hideLoadingCircle();
    }
}

async function createProduct() {
    showLoadingCircle();

    try {
        const name = document.getElementById('productName').value;
        const quantity = document.getElementById('productQuantity').value;
        const entityAddress = document.getElementById('productEntityAddress').value;

        await contract.methods.create_product(name, quantity, entityAddress).send({ from: currentUserAddress });
    } catch (error) {
        console.log(error);
        alert(error.cause); 
    } finally{
        hideLoadingCircle();
    }
}

async function removeProduct() {
    showLoadingCircle();

    try {
        const productId = document.getElementById('removeProductId').value;

        await contract.methods.remove_product(productId).send({ from: currentUserAddress });
    } catch (error) {
        console.log(error);
        alert(error.cause); 
    } finally{
        hideLoadingCircle();
    }
}

async function getProducts() {
    showLoadingCircle();
    try {
        const products = await contract.methods.get_products().call({ from: contractAddress });
        const productList = document.getElementById('productList');
        productList.innerHTML = '';

        if (products.length === 0) {
            const listItem = document.createElement('li');
            listItem.textContent = `Products list is empty.`;
            productList.appendChild(listItem);
        }

        products.forEach(product => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
            <p>Product ID: ${product.id}</p>
            <p>Name: ${product.name}</p>
            <p>Current Supply Chain Entity: ${product.currentScEntity}</p>
            <p>Quantity: ${product.quantity}</p>`;
            productList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching products', error);
        alert(error.cause); 
    } finally {
        hideLoadingCircle();
    }
}

async function getProductEntity(product_id) {
    showLoadingCircle();
    try {
        const entity = await contract.methods.get_product_entity(product_id).call({ from: contractAddress });
        const productEntityDetails = document.getElementById('productEntityDetails');
        productEntityDetails.innerHTML = `
            <p>Entity Address: ${entity.entity_address}</p>
            <p>Name: ${entity.name}</p>
            <p>EntityType: ${EntityTypeString[entity.entity_type]}</p>`;
    } catch (error) {
        console.error('Error fetching product entity', error);
        alert(error.cause); 
    } finally {
        hideLoadingCircle();
    }
}

async function createShipment() {
    showLoadingCircle();
    try {
        const destination = document.getElementById('shipmentDestination').value;
        const productId = document.getElementById('shipmentProductId').value;
        const arrivalDate = document.getElementById('shipmentArrivalDate').value;

        // Convert date to timestamp
        const arrivalTimestamp = Math.floor(new Date(arrivalDate).getTime() / 1000);

        await contract.methods.create_shipment(destination, productId, arrivalTimestamp).send({ from: currentUserAddress });    } catch (error) {
        console.log(error);
        alert(error.cause); 
    } finally{
        hideLoadingCircle();
    }
}

async function getShipment(shipment_id) {
    showLoadingCircle();
    try {
        const shipment = await contract.methods.get_shipment(shipment_id).call({ from: contractAddress });
        const shipmentDetails = document.getElementById('shipmentDetails');
        shipmentDetails.innerHTML = `
            <p>Shipment ID: ${shipment.shipment_id}</p>
            <p>Origin: ${shipment.origin}</p>
            <p>Destination: ${shipment.destination}</p>
            <p>Date of Departure: ${new Date(shipment.date_of_departure * 1000).toLocaleString()}</p>
            <p>Expected Date of Arrival: ${new Date(shipment.expected_date_of_arrival * 1000).toLocaleString()}</p>
            <p>Product ID: ${shipment.product_id}</p>`;
    } catch (error) {
        console.error('Error fetching shipment', error);
        alert(error.cause);
    } finally {
        hideLoadingCircle();
    }
}

async function getShipments() {
    showLoadingCircle();
    try {
        const shipments = await contract.methods.get_shipments().call({ from: contractAddress });
        const shipmentList = document.getElementById('shipmentList');
        shipmentList.innerHTML = '';

        if (shipments.length === 0) {
            const listItem = document.createElement('li');
            listItem.textContent = `Shipments list is empty.`;
            shipmentList.appendChild(listItem);
        }

        console.log("done");
        shipments.forEach(shipment => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
            <p>Shipment ID: ${shipment.shipment_id}</p>
            <p>Origin: ${shipment.origin}</p>
            <p>Destination: ${shipment.destination}</p>
            <p>Date of Departure: ${new Date(Number(shipment.date_of_departure) * 1000).toLocaleString()}</p>
            <p>Expected Date of Arrival: ${new Date(Number(shipment.expected_date_of_arrival) * 1000).toLocaleString()}</p>
            <p>Product ID: ${shipment.product_id}</p>`;
            shipmentList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching shipments', error);
        alert(error.cause);
    } finally {
        hideLoadingCircle();
    }
}

async function getProductShipments(product_id) {
    showLoadingCircle();
    try {
        const shipments = await contract.methods.get_product_shipments(product_id).call({ from: contractAddress });
        const productShipmentList = document.getElementById('productShipmentList');
        productShipmentList.innerHTML = '';

        if (shipments.length === 0) {
            const listItem = document.createElement('li');
            listItem.textContent = `No shipments found for product ID ${product_id}.`;
            productShipmentList.appendChild(listItem);
        }

        shipments.forEach(shipment => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
            <p>Shipment ID: ${shipment.shipment_id}</p>
            <p>Origin: ${shipment.origin}</p>
            <p>Destination: ${shipment.destination}</p>
            <p>Date of Departure: ${new Date(shipment.date_of_departure * 1000).toLocaleString()}</p>
            <p>Expected Date of Arrival: ${new Date(shipment.expected_date_of_arrival * 1000).toLocaleString()}</p>
            <p>Product ID: ${shipment.product_id}</p>`;
            productShipmentList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching product shipments', error);
        alert(error.cause);
    } finally {
        hideLoadingCircle();
    }
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
            listItem.innerHTML = `
            <p>Address: ${entity.entity_address}</p>
            <p>Name: ${entity.name}</p>
            <p>EntityType: ${EntityTypeString[entity.entity_type]}</p>`;
            entityList.appendChild(listItem);
        });

    } catch (error) {
        console.error('Error fetching entities', error);
        alert(error.cause);
    } finally{
        hideLoadingCircle();
    }
}

async function createScEntity() {
    showLoadingCircle();

    try {
        const entityAddress = document.getElementById('scEntityAddress').value;
        const name = document.getElementById('scEntityName').value;
        const entityType = document.getElementById('scEntityType').value;

        console.log(currentUserAddress);
        await contract.methods.create_ScEntity(entityAddress, name, entityType).send({ from: currentUserAddress });
    } catch (error) {
        console.error(error);
        alert(error.cause);
    } finally{
        hideLoadingCircle();
    }
}

async function getScEntity(entityAddress) {
    showLoadingCircle();
    try {
        const entityAddress = document.getElementById('get_scEntityAddress').value;
        // Call the Solidity function to get the entity details
        const entity = await contract.methods.get_ScEntity(entityAddress).call({ from: contractAddress });

        // Get the HTML element to display the entity details
        const scEntityDetails = document.getElementById('scEntityDetails');
        scEntityDetails.innerHTML = `
            <p>Entity Address: ${entity.entity_address}</p>
            <p>Name: ${entity.name}</p>
            <p>Entity Type: ${EntityTypeString[entity.entity_type]}</p>`;
    } catch (error) {
        console.error('Error fetching SC entity', error);
        alert(error.message); // Use error.message to get a human-readable error message
    } finally {
        hideLoadingCircle();
    }
}

async function removeScEntity() {
    showLoadingCircle();

    try{
        const entityAddress = document.getElementById('removeScEntityAddress').value;

        await contract.methods.remove_ScEntity(entityAddress).send({ from: currentUserAddress });
    } catch (error) {
        console.error(error);
        alert(error.cause);
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
        const user = await contract.methods.view_user(userAddress).call({ from: currentUserAddress });
        // const entities = await contract.methods.get_ScEntities().call({ from: contractAddress});


        // Display the user information
        document.getElementById("userInfo").innerText = `
            Name: ${user.name}
            Role: ${user.role}
            Address: ${user.user_address}
        `;
    } catch (error) {
        console.error(error);
        alert(error.cause);
    } finally{
        hideLoadingCircle();
    }
}
