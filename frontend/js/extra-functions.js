function showLoadingCircle() {
    document.querySelector('.loading-circle').style.display = 'block';
    document.querySelector('.loading-success').style.display = 'none';
}

function showSuccess() {
    document.querySelector('.loading-circle').style.display = 'none';
    document.querySelector('.loading-success').style.display = 'block';
    setTimeout(() => hideSuccess(), 2000);
}

function hideLoadingCircle() {
    document.querySelector('.loading-circle').style.display = 'none';
}

function hideSuccess() {
    document.querySelector('.loading-success').style.display = 'none';
}

// function hideSuccess() {
//     const successElement = document.querySelector('.loading-success');
//     successElement.style.opacity = '0'; // Start fade-out effect

//     // Remove from the DOM after fade-out is complete
//     setTimeout(() => {
//         successElement.style.display = 'none';
//     }, 1000); // Matches the duration of the CSS transition
// }

function copyToClipboard(account) {
    const textArea = document.createElement("textarea");
    textArea.value = account;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    document.getElementById('copiedMessage').style.display = 'block';
    setTimeout(() => {
        document.getElementById('copiedMessage').style.display = 'none';
    }, 2000);
}

function copySelectedAccount() {
    const accountDropdown = document.getElementById('accountDropdown');
    const selectedAccount = accountDropdown.value;
    if (selectedAccount) {
        copyToClipboard(selectedAccount);
    }
}

// Function to update the address based on the selected user
function updateUserAddress() {
    const userDropdown = document.getElementById('userDropdown');
    const selectedAddress = userDropdown.value;
    const userAddressDiv = document.getElementById('selectedUserAddress');
    userAddressDiv.innerText = `Address: ${selectedAddress}`;
    currentUserAddress = selectedAddress;
}

// Call this function after fetching accounts and populating the dropdown
function populateUserDropdown() {
    const userDropdown = document.getElementById('userDropdown');
    accounts.forEach(account => {
        const option = document.createElement('option');
        option.value = account;
        option.text = users.find(user => user.address === account)?.name || account;
        userDropdown.appendChild(option);
    });
}
