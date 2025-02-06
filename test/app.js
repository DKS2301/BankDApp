// Replace with your contract's ABI and address
const contractABI = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "accountNumber",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "name",
                "type": "string"
            }
        ],
        "name": "AccountCreated",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "accounts",
        "outputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "accountNumber",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "balance",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "pin",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "exists",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_accountNumber",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_initialDeposit",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_pin",
                "type": "uint256"
            }
        ],
        "name": "createAccount",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_accountNumber",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_pin",
                "type": "uint256"
            }
        ],
        "name": "checkBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    }
];

const contractAddress = "0xc4A803dEE079cCBE51ef4D70a5616d30ccd36b46"; // Replace with your contract's address
const senderAddress = "0x855081e756f182961FA966bD6A6a18FBcA9A55f0"; // Replace with your sender's address

const web3 = new Web3("http://127.0.0.1:7545"); //Ganache RPC

const bankContract = new web3.eth.Contract(contractABI, contractAddress);

// Disable submit button initially
const createAccountButton = document.querySelector("#createAccountForm button");
const checkBalanceButton = document.querySelector("#checkBalanceForm button");

// Function to enable/disable the submit buttons based on form input
const toggleButtonState = (formId) => {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll("input");
    const isFormValid = [...inputs].every(input => input.value.trim() !== "");
    
    if (formId === "createAccountForm") {
        createAccountButton.disabled = !isFormValid;
    } else if (formId === "checkBalanceForm") {
        checkBalanceButton.disabled = !isFormValid;
    }
};

// Add event listeners to input fields to trigger validation
document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", () => {
        toggleButtonState(input.closest("form").id);
    });
});

// Create Account
document.getElementById("createAccountForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const accountNumber = document.getElementById("accountNumber").value;
    const initialDeposit = document.getElementById("initialDeposit").value;
    const pin = document.getElementById("pin").value;

    const accounts = await web3.eth.getAccounts();

    // Disable button and show loading state
    createAccountButton.disabled = true;
    createAccountButton.innerHTML = "Creating Account...";

    try {
        const gasEstimate = await bankContract.methods.createAccount(name, accountNumber, web3.utils.toWei(initialDeposit, "ether"), pin)
    .estimateGas({ from: accounts[0] });

await bankContract.methods.createAccount(name, accountNumber, web3.utils.toWei(initialDeposit, "ether"), pin)
    .send({ from: accounts[0], gas: gasEstimate });


    await web3.eth.getTransactionReceipt(createAccountTransaction.transactionHash);

    console.log("Account successfully created, now you can check balance.");
        alert("Account created successfully!");
        createAccountButton.innerHTML = "Account Created!";
    } catch (error) {
        alert("Error creating account: " + error.message);
        createAccountButton.innerHTML = "Try Again";
    } finally {
        createAccountButton.disabled = false;
    }
});

// Check Balance
document.getElementById("checkBalanceForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const accountNumber = document.getElementById("checkAccountNumber").value;
    const pin = document.getElementById("checkPin").value;

    // Disable button and show loading state
    checkBalanceButton.disabled = true;
    checkBalanceButton.innerHTML = "Checking Balance...";
    const accounts = await web3.eth.getAccounts();

    try {
        const gasEstimate = await bankContract.methods
            .checkBalance(accountNumber, pin)
            .estimateGas({ from: accounts[0] });
    
        const balance = await bankContract.methods
            .checkBalance(accountNumber, pin)
            .call();
        document.getElementById("balanceResult").innerText = `Balance: ${web3.utils.fromWei(balance, "ether")} ETH`;
    } catch (error) {
        document.getElementById("balanceResult").innerText = `Error fetching balance: ${error.message}`;
    }
    finally {
        checkBalanceButton.disabled = false;
        checkBalanceButton.innerHTML = "Check Balance";
    }
});
