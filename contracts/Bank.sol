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
    ) public view returns (uint256) {
        require(accounts[_accountNumber].exists, "Account does not exist");
        require(accounts[_accountNumber].pin == _pin, "Invalid Pin");
        return accounts[_accountNumber].balance;
    }
}
