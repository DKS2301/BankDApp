import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { motion } from "framer-motion";
import { FaWallet, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const ConnectWallet = ({ setSigner }) => {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Extract the redirect path from the query string
  const params = new URLSearchParams(location.search);
  const redirectPath = params.get("redirect") || "/";

  const connectWallet = async () => {
    if (!window.ethereum) {
      setError("⚠️ MetaMask not installed!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });

      setAccount(accounts[0]);
      setSigner(signer);

      // ✅ Navigate back to where the user was trying to go
      setTimeout(() => {
        navigate(redirectPath);
      }, 300);
    } catch (error) {
      console.error("Connection error:", error);
      setError("❌ Connection failed. Try again!");
    }

    setLoading(false);
  };

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: "eth_accounts" });
          if (accounts.length > 0) {
            setAccount(accounts[0]);
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error);
        }
      }
    };

    checkWalletConnection();
  }, []);

  return (
    <motion.div
      className="flex flex-col items-center justify-center bg-white shadow-lg p-5 rounded-lg w-80"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Icon */}
      <div className="text-blue-600 text-3xl mb-3">
        {account ? <FaCheckCircle className="text-green-500" /> : <FaWallet />}
      </div>

      {/* Wallet Status */}
      {account ? (
        <p className="text-green-600 font-semibold text-sm text-center">
          ✅ Connected: {account.slice(0, 6)}...{account.slice(-4)}
        </p>
      ) : (
        <motion.button
          className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300"
          onClick={connectWallet}
          disabled={loading}
          whileHover={!loading ? { scale: 1.05 } : {}}
          whileTap={!loading ? { scale: 0.95 } : {}}
        >
          {loading ? "Connecting..." : "Connect Wallet"}
        </motion.button>
      )}

      {/* Error Message */}
      {error && (
        <motion.div
          className="mt-2 text-red-600 text-sm flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <FaExclamationTriangle className="mr-1" /> {error}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ConnectWallet;
