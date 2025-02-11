import { useState } from "react";
import { ethers } from "ethers";
import { motion } from "framer-motion";

const BalanceChecker = ({ contract, signer }) => {
  const [accountNumber, setAccountNumber] = useState("");
  const [pin, setPin] = useState("");
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleCheckBalance = async () => {
    setError("");
    setBalance(null);

    if (!accountNumber || !pin) {
      setMessage("⚠️ Please enter both Account Number and PIN.");
      return;
    }

    if (!signer) {
      setMessage("⚠️ Wallet not connected. Please connect your wallet.");
      return;
    }

    const accountNum = parseInt(accountNumber);
    const pinNum = parseInt(pin);

    if (isNaN(accountNum) || isNaN(pinNum)) {
      setMessage("❌ Invalid input. Please enter numeric values.");
      return;
    }

    try {
      const exists = await contract.accountExistsCheck(ethers.toBigInt(accountNumber));

      if (!exists) {
        setError("❌ Account does not exist. Please check the account number.");
        return;
      }

      setLoading(true);

      const balance = await contract.checkBalance(accountNum, pinNum);
      if (!balance) {
        throw new Error("Invalid response from contract.");
      }

      const formattedBal = ethers.formatEther(balance);
      setBalance(formattedBal);
    } catch (err) {
      setError("❌ Failed to fetch balance. Check details and try again.");
      console.error("Error fetching balance:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 flex justify-center items-center p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="w-full max-w-lg bg-white/10 backdrop-blur-md shadow-2xl p-8 rounded-3xl border border-white/20 text-white flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2
          className="text-3xl font-bold mb-5 text-center bg-gradient-to-r text-teal-500 bg-clip-text"
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
          className="w-full p-3 mb-3 border rounded-lg bg-white/20 text-white focus:ring-2 focus:ring-blue-500 placeholder-gray-200"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
          whileFocus={{ scale: 1.02 }}
        />

        {/* PIN Input */}
        <motion.input
          type="password"
          placeholder="PIN"
          className="w-full p-3 mb-3 border rounded-lg bg-white/20 text-white focus:ring-2 focus:ring-blue-500 placeholder-gray-200"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          whileFocus={{ scale: 1.02 }}
        />

        {/* Error Message */}
        {error && (
          <motion.p
            className="text-red-400 text-sm mb-2"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
          </motion.p>
        )}

        {/* Check Button */}
        <motion.button
          className="bg-teal-500 text-white px-6 py-3 rounded-lg w-full hover:bg-teal-700 transition disabled:bg-gray-400"
          onClick={handleCheckBalance}
          disabled={loading}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? "Checking..." : "Check Balance"}
        </motion.button>

        {/* Display Balance */}
        {balance !== null && (
          <motion.div
            className="mt-5 p-4 bg-white/20 text-white rounded-lg border border-white/30 text-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <p className="text-gray-300">Balance:</p>
            <p className="text-2xl font-bold text-green-400">{balance} ETH</p>
          </motion.div>
        )}

        {/* Message */}
        {message && (
          <motion.div
            className="mt-4 text-center text-sm font-semibold text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {message}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default BalanceChecker;
