// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Bank {
    struct Account {
        string name;
        uint256 accountNumber;
        uint256 balance;
        uint256 pin;
        bool exists;
        address owner;
    }

    mapping(uint256 => Account) public accounts;
    mapping(address => bool) private hasAccount; // Track which addresses have created an account

    event AccountCreated(address indexed owner, uint accountNumber);

    function createAccount(
        string memory name,
        uint accountNumber,
        uint initialDeposit,
        uint pin
    ) public {
        require(
            !hasAccount[msg.sender],
            "You have already created an account."
        ); // Prevent multiple accounts per address
        require(
            accounts[accountNumber].owner == address(0),
            "Account number already exists."
        );

        accounts[accountNumber] = Account(
            name,
            accountNumber,
            initialDeposit,
            pin,
            true,
            msg.sender
        );
        hasAccount[msg.sender] = true; // Mark this address as having created an account

        emit AccountCreated(msg.sender, accountNumber);
    }

    function accountExistsCheck(address user) public view returns (bool) {
        return hasAccount[user]; // Return whether an account exists for the given address
    }

    event Deposit(uint256 indexed accountNumber, uint256 amount);
    event Withdrawal(uint256 indexed accountNumber, uint256 amount);
    event Transfer(
        uint256 indexed fromAccount,
        uint256 indexed toAccount,
        uint256 amount
    );

    modifier accountExists(uint256 _accountNumber) {
        require(accounts[_accountNumber].exists, "Account does not exist");
        _;
    }

    modifier correctPin(uint256 _accountNumber, uint256 _pin) {
        require(accounts[_accountNumber].pin == _pin, "Invalid Pin");
        _;
    }

    function checkBalance(
        uint256 _accountNumber,
        uint256 _pin
    )
        public
        view
        accountExists(_accountNumber)
        correctPin(_accountNumber, _pin)
        returns (uint256)
    {
        return accounts[_accountNumber].balance;
    }

    function deposit(
        uint256 _accountNumber,
        uint256 _amount,
        uint256 _pin
    ) public accountExists(_accountNumber) correctPin(_accountNumber, _pin) {
        require(_amount > 0, "Deposit amount must be greater than zero");
        accounts[_accountNumber].balance += _amount;
        emit Deposit(_accountNumber, _amount);
    }

    function withdraw(
        uint256 _accountNumber,
        uint256 _amount,
        uint256 _pin
    ) public accountExists(_accountNumber) correctPin(_accountNumber, _pin) {
        require(
            accounts[_accountNumber].balance >= _amount,
            "Insufficient balance"
        );
        accounts[_accountNumber].balance -= _amount;
        emit Withdrawal(_accountNumber, _amount);
    }

    function transfer(
        uint256 _fromAccount,
        uint256 _toAccount,
        uint256 _amount,
        uint256 _pin
    )
        public
        accountExists(_fromAccount)
        accountExists(_toAccount)
        correctPin(_fromAccount, _pin)
    {
        require(
            accounts[_fromAccount].balance >= _amount,
            "Insufficient balance"
        );
        accounts[_fromAccount].balance -= _amount;
        accounts[_toAccount].balance += _amount;
        emit Transfer(_fromAccount, _toAccount, _amount);
    }
}
