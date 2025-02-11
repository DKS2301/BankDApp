import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./components/Home";
import ConnectWallet from "./components/ConnectWallet";
import AccountForm from "./components/AccountForm";
import BalanceChecker from "./components/BalanceChecker";
import DepositWithdraw from "./components/DepositWithdraw";
import TransferFunds from "./components/TransferFunds";
import ProtectedRoute from "./components/ProtectedRoute";
import { contractAddress } from "./config";
import { contractABI } from "./contractABI";
import { ethers } from "ethers";

function App() {
  const [signer, setSigner] = useState(null);
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  return (
    <Router>
      {/* Full Page Layout */}
      <div className="min-h-screen flex flex-col  absolute inset-0 bg-gradient-to-r from-black via-gray-800 to-black opacity-100 backdrop-blur-xl">
        
        {/* Fixed Navbar - Stays at the same spot even when scrolling */}
        <div className="fixed top-0 left-0 w-full z-50 bg-black bg-opacity-40 backdrop-blur-lg shadow-md">
        <Navbar signer={signer} contract={contract} />
        </div>

        {/* Content - Prevent Overlap with Navbar */}
        <div className="flex-1 flex flex-col w-full pt-28 -mt-30">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/connect-wallet" element={<ConnectWallet setSigner={setSigner} />} />

            {/* Protected Routes */}
            <Route
              path="/create-account"
              element={
                <ProtectedRoute signer={signer}>
                  <AccountForm signer={signer} contract={contract} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/check-balance"
              element={
                <ProtectedRoute signer={signer}>
                  <BalanceChecker signer={signer} contract={contract} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/deposit-withdraw"
              element={
                <ProtectedRoute signer={signer}>
                  <DepositWithdraw signer={signer} contract={contract} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/transfer-funds"
              element={
                <ProtectedRoute signer={signer}>
                  <TransferFunds signer={signer} contract={contract} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
