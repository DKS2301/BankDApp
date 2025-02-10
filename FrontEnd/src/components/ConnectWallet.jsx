import { useState } from "react";
import { ethers } from "ethers";

const ConnectWallet = ({ setSigner }) => {
  const [account, setAccount] = useState(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask not installed!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

      setAccount(accounts[0]);
      setSigner(signer);
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center py-4">
      {account ? (
        <p className="text-green-500">Connected: {account}</p>
      ) : (
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={connectWallet}>
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default ConnectWallet;
