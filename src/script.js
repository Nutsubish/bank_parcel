document.addEventListener('DOMContentLoaded', () => {
    const accounts = {};

    const createAccountForm = document.getElementById('create-account-form');
    const transferForm = document.getElementById('transfer-form');
    const accountList = document.getElementById('account-list');

    // Handle account creation
    createAccountForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const accNumber = document.getElementById('acc-number').value;
        const accName = document.getElementById('acc-name').value;
        const accBalance = parseFloat(document.getElementById('acc-balance').value);

        // Create new account
        accounts[accNumber] = { 
            name: accName, 
            balance: accBalance,
        };
        updateAccountList();
        createAccountForm.reset();
    });

    transferForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const fromAcc = document.getElementById('from-acc').value;
        const toAcc = document.getElementById('to-acc').value;
        const amount = parseFloat(document.getElementById('amount').value);

        if (fromAcc == '') {
            alert('The "From" account number cannot be empty. Please provide a valid account number.');
            return;
        }

        if (toAcc == '') {
            alert('The "To" account number cannot be empty. Please provide a valid account number.');
            return;
        }

        if (amount <= 0) {
            alert('Transfer amount must be greater than zero. Please provide a valid amount.');
            return;
        }

        if (!accounts[fromAcc]) {
            alert('The "From" account does not exist. Please enter a valid account number.');
            return;
        }

        if (!accounts[toAcc]) {
            alert('The "To" account does not exist. Please enter a valid account number.');
            return;
        }

        if (accounts[fromAcc].balance < amount) {
            alert('Insufficient funds in the "From" account. Please ensure the account has enough balance for the transfer.');
            return;
        }

        // Perform the transfer
        accounts[fromAcc].balance -= amount;
        accounts[toAcc].balance += amount;
        updateAccountList();
        transferForm.reset();
    });

    // Update the account list display
    const updateAccountList = () => {
        accountList.innerHTML = '';

        const accountNumbers = Object.keys(accounts);
        for (let i = 0; i < accountNumbers.length; i++) {
            const accNumber = accountNumbers[i];
            const { name, balance } = accounts[accNumber];
            const accountInfo = document.createElement('div');
            accountInfo.textContent = `Account Number: ${accNumber}, Name: ${name}, Balance: $${balance}`;
            accountList.appendChild(accountInfo);
        }
    };
});
