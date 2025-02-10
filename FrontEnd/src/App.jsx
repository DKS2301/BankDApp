import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import ConnectWallet from "./components/ConnectWallet";
import AccountForm from "./components/AccountForm";
import BalanceChecker from "./components/BalanceChecker";
import DepositWithdraw from "./components/DepositWithdraw";
import TransferFunds from "./components/TransferFunds";

function App() {
  const [signer, setSigner] = useState(null);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Navbar />
        <div className="flex justify-center p-5">
          <Routes>
            <Route path="/" element={<ConnectWallet setSigner={setSigner} />} />
            <Route path="/create-account" element={<AccountForm signer={signer} />} />
            <Route path="/check-balance" element={<BalanceChecker signer={signer} />} />
            <Route path="/deposit-withdraw" element={<DepositWithdraw signer={signer} />} />
            <Route path="/transfer-funds" element={<TransferFunds signer={signer} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
