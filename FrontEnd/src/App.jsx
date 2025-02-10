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
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* ✅ Navbar should be inside Router to allow navigation */}
        <Navbar signer={signer} contract={contract} />

        <div className="flex justify-center p-5">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/connect-wallet" element={<ConnectWallet setSigner={setSigner} />} />

            {/* Protected Routes */}
            <Route
              path="/create-account"
              element={
                <ProtectedRoute signer={signer}>
                  <AccountForm signer={signer}  contract={contract}  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/check-balance"
              element={
                <ProtectedRoute signer={signer}>
                  <BalanceChecker signer={signer}  contract={contract} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/deposit-withdraw"
              element={
                <ProtectedRoute signer={signer}>
                  <DepositWithdraw signer={signer}  contract={contract} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/transfer-funds"
              element={
                <ProtectedRoute signer={signer}>
                  <TransferFunds signer={signer}  contract={contract} />
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
