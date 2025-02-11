
# **BankDApp**  

## **Overview**  
**BankDApp** is a decentralized banking application built using **Solidity**, **React (Vite.js)**, **Tailwind CSS**, and **ethers.js**. The application allows users to interact with a smart contract on the Ethereum blockchain for banking operations such as account creation, deposits, withdrawals, balance checks, and fund transfers.  

## **Features**  
- **Decentralized Banking System**: Users can manage their accounts securely on the blockchain.  
- **MetaMask Authentication**: Enables secure interaction with the Ethereum network.  
- **Smart Contract Integration**: Uses **ethers.js** to interact with a Solidity-based banking contract.  
- **User-Friendly UI**: Built with **React (Vite.js)** and **Tailwind CSS** for a responsive and modern interface.  
- **Core Banking Functions**:  
  - Create an account  
  - Check balance  
  - Deposit funds  
  - Withdraw funds  
  - Transfer funds  

## **Tech Stack**  
### **Frontend**  
- React (Vite.js)  
- Tailwind CSS  
- ethers.js  

### **Backend (Smart Contract)**  
- Solidity  
- Hardhat  

## **Installation**  

### **Prerequisites**  
Ensure you have the following installed:  
- **Node.js** and **npm/yarn**  
- **MetaMask** browser extension  
- **Hardhat** for smart contract development  

### **Setup**  

1. **Clone the repository**  
   ```bash
   git clone https://github.com/DKS2301/BankDApp.git
   cd BankDApp
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

3. **Run the development server**  
   ```bash
   npm run dev
   ```

4. **Deploy the smart contract** (if modifying or testing)  
   ```bash
   npx hardhat run scripts/deploy.js --network localhost
   ```

## **Usage**  
1. **Connect MetaMask** to interact with the banking contract.  
2. **Create an account** through the UI.  
3. **Perform banking operations** like deposits, withdrawals, and transfers.  
4. **Check transaction history** directly from the blockchain.  

## **Smart Contract Details**  
The smart contract is written in Solidity and includes functions for:  
- **Creating accounts**  
- **Depositing and withdrawing funds**  
- **Transferring funds between accounts**  
- **Retrieving account balances**  

## **License**  
This project is licensed under the **MIT License**.  

---

This README follows best practices by providing a clear **overview, features, setup instructions, and usage details**. Let me know if you want any modifications!
