import { useState } from "react";
import { ethers } from "ethers";
import { motion } from "framer-motion";

const TransferFunds = ({ contract, signer }) => {
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleTransfer = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Input Validation
    if (!fromAccount || !toAccount || !amount || !pin) {
      setError("All fields are required.");
      return;
    }
    if (fromAccount === toAccount) {
      setError("Sender and recipient cannot be the same.");
      return;
    }
    if (Number(amount) <= 0) {
      setError("Amount must be greater than zero.");
      return;
    }
    if (!signer) {
      setError("Wallet not connected. Please connect your wallet.");
      return;
    }

    try {
      setLoading(true);

      // Convert amount to Wei for Solidity contract
      const amountInWei = ethers.parseEther(amount);

      // Call smart contract function (assuming transferFunds function exists)
      const tx = await contract.transfer(fromAccount, toAccount, amountInWei, pin);
      await tx.wait();

      setSuccess("Transfer successful!");
    } catch (err) {
      setError("Transaction failed. Please check details and try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="bg-white p-5 rounded-lg shadow-md w-80 mt-5"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
    >
      <motion.h2
        className="text-xl font-semibold mb-3 text-purple-700 text-center"
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        Transfer Funds
      </motion.h2>

      {/* Account Number Inputs */}
      <motion.input
        type="number"
        placeholder="Your Account Number"
        className="w-full p-2 mb-2 border rounded focus:ring-2 focus:ring-purple-500"
        value={fromAccount}
        onChange={(e) => setFromAccount(e.target.value)}
        whileFocus={{ scale: 1.02 }}
      />
      <motion.input
        type="number"
        placeholder="Recipient Account Number"
        className="w-full p-2 mb-2 border rounded focus:ring-2 focus:ring-purple-500"
        value={toAccount}
        onChange={(e) => setToAccount(e.target.value)}
        whileFocus={{ scale: 1.02 }}
      />

      {/* Amount and PIN Inputs */}
      <motion.input
        type="number"
        placeholder="Amount (ETH)"
        className="w-full p-2 mb-2 border rounded focus:ring-2 focus:ring-purple-500"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        whileFocus={{ scale: 1.02 }}
      />
      <motion.input
        type="password"
        placeholder="PIN"
        className="w-full p-2 mb-2 border rounded focus:ring-2 focus:ring-purple-500"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        whileFocus={{ scale: 1.02 }}
      />

      {/* Error and Success Messages */}
      {error && (
        <motion.p
          className="text-red-600 text-sm mb-2"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.p>
      )}
      {success && (
        <motion.p
          className="text-green-600 text-sm mb-2"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {success}
        </motion.p>
      )}

      {/* Transfer Button */}
      <motion.button
        onClick={handleTransfer}
        className="bg-purple-600 text-white px-4 py-2 rounded w-full hover:bg-purple-700 transition disabled:bg-gray-400"
        disabled={loading}
        whileTap={{ scale: 0.95 }}
      >
        {loading ? "Processing..." : "Transfer"}
      </motion.button>
    </motion.div>
  );
};

export default TransferFunds;
