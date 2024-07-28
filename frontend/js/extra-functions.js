
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
