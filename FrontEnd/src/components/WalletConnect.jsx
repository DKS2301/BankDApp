import React from "react";
import { useState } from "react";

const WalletConnect = ({ setAccount }) => {
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    if (window.ethereum) {
      setLoading(true);
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
      } catch (error) {
        alert("Failed to connect wallet!");
        console.error(error);
      }
      setLoading(false);
    } else {
      alert("MetaMask not found!");
    }
  };

  return (
    <div>
      <button onClick={connectWallet} disabled={loading}>
        {loading ? "Connecting..." : "Connect Wallet"}
      </button>
    </div>
  );
};

export default WalletConnect;
