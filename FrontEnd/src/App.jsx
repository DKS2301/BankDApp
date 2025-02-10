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

function App() {
  const [signer, setSigner] = useState(null);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* ✅ Navbar should be inside Router to allow navigation */}
        <Navbar signer={signer} />

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
                  <AccountForm signer={signer} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/check-balance"
              element={
                <ProtectedRoute signer={signer}>
                  <BalanceChecker signer={signer} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/deposit-withdraw"
              element={
                <ProtectedRoute signer={signer}>
                  <DepositWithdraw signer={signer} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/transfer-funds"
              element={
                <ProtectedRoute signer={signer}>
                  <TransferFunds signer={signer} />
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
