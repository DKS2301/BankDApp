// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Bank {
    struct Account {
        string name;
        uint256 accountNumber;
        uint256 balance;
        uint256 pin;
        bool exists;
    }

    mapping(uint256 => Account) public accounts;

    event AccountCreated(uint256 indexed accountNumber, string name);
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

    function createAccount(
        string memory _name,
        uint256 _accountNumber,
        uint256 _initialDeposit,
        uint256 _pin
    ) public {
        require(!accounts[_accountNumber].exists, "Account already exists");

        accounts[_accountNumber] = Account({
            name: _name,
            accountNumber: _accountNumber,
            balance: _initialDeposit,
            pin: _pin,
            exists: true
        });

        emit AccountCreated(_accountNumber, _name);
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
        uint256 _amount
    ) public accountExists(_accountNumber) {
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
