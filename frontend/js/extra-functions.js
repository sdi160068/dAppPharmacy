
function showLoadingCircle() {
    document.getElementById('loading-circle').style.display = 'block';
}

function hideLoadingCircle() {
    document.getElementById('loading-circle').style.display = 'none';
}

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
