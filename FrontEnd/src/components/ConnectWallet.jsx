import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { motion } from "framer-motion";
import { FaWallet, FaCheckCircle, FaExclamationTriangle, FaSpinner } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const ConnectWallet = ({ setSigner }) => {
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Extract redirect path from query string
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

      // ✅ Navigate back to the intended page
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
    <motion.div className="flex flex-col items-center justify-center h-screen">
      <motion.div
        className="w-full max-w-lg bg-white/10 backdrop-blur-md shadow-2xl p-8 rounded-3xl border border-white/20 text-white flex flex-col items-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Icon & Title */}
        <motion.h2 className="text-3xl font-bold text-teal-500 mb-6 flex items-center" animate={{ y: [10, 0] }}>
          <FaWallet className="mr-3 text-teal-500" /> Connect Wallet
        </motion.h2>

        {/* Wallet Status */}
        {account ? (
          <motion.p
            className="text-teal-400 font-semibold text-sm text-center bg-teal-800/30 px-4 py-2 rounded-lg"
            animate={{ opacity: [0, 1] }}
          >
            ✅ Connected: {account.slice(0, 6)}...{account.slice(-4)}
          </motion.p>
        ) : (
          <motion.button
            onClick={connectWallet}
            className="bg-teal-600 text-white px-6 py-3 rounded-lg w-full text-lg flex justify-center items-center hover:bg-teal-700 transition disabled:bg-gray-400"
            disabled={loading}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? <FaSpinner className="animate-spin" /> : "Connect Wallet"}
          </motion.button>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            className="mt-4 text-red-500 text-sm flex items-center bg-red-800/20 px-4 py-2 rounded-lg"
            animate={{ opacity: [0, 1] }}
          >
            <FaExclamationTriangle className="mr-2" /> {error}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ConnectWallet;
