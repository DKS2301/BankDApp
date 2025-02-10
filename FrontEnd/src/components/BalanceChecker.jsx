import { useState } from "react";
import { ethers } from "ethers";
import { motion } from "framer-motion";

const BalanceChecker = ({ contract, signer }) => {
  const [accountNumber, setAccountNumber] = useState("");
  const [pin, setPin] = useState("");
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheckBalance = async () => {
    setError("");
    setBalance(null);

    if (!accountNumber || !pin) {
      setError("Please enter both Account Number and PIN.");
      return;
    }

    if (!signer) {
      setError("Wallet not connected. Please connect your wallet.");
      return;
    }

    try {
        console.log(accountNumber,pin,)
      setLoading(true);
      const balance = await contract.checkBalance(accountNumber, pin); // Assuming getBalance(accountNumber, pin) exists in Solidity
      const formattedbal = ethers.formatEther(balance)
      setBalance(formattedbal)// Convert wei to ether
    } catch (err) {
      setError("Failed to fetch balance. Check details and try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
    className=" mx-auto p-10 bg-white shadow-lg rounded-lg flex-flexwrap center w-120"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6 }}
  >
      <motion.h2 
        className="text-2xl font-bold mb-3 p-5 text-center text-sky-700"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        Check Balance
      </motion.h2>

      {/* Account Number Input */}
      <motion.input
        type="number"
        placeholder="Account Number"
        className="w-full p-4 mb-2 border rounded focus:ring-2 focus:ring-sky-500"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
        whileFocus={{ scale: 1.02 }}
      />

      {/* PIN Input */}
      <motion.input
        type="password"
        placeholder="PIN"
        className="w-full p-2 mb-2 border rounded focus:ring-2 focus:ring-sky-500"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        whileFocus={{ scale: 1.02 }}
      />

      {/* Error Message */}
      {error && (
        <motion.p 
          className="text-red-600 text-sm mb-2"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.p>
      )}

      {/* Check Button */}
      <motion.button
        className="bg-sky-400 text-white px-4 py-2 rounded w-full hover:bg-sky-700 transition disabled:bg-gray-400"
        onClick={handleCheckBalance}
        disabled={loading}
        whileTap={{ scale: 0.95 }}
      >
        {loading ? "Checking..." : "Check Balance"}
      </motion.button>

      {/* Display Balance */}
      {balance !== null && (
        <motion.div 
          className="mt-3 p-3 bg-gray-100 text-center rounded border border-sky-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <p className="text-gray-800 font-medium">Balance:</p>
          <p className="text-lg font-bold text-green-600">{balance} ETH</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default BalanceChecker;
