import { useState } from "react";
import { ethers } from "ethers";
import { motion } from "framer-motion";

import { FaUserPlus } from "react-icons/fa";

const AccountForm = ({ signer ,contract}) => {
  const [name, setName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [initialDeposit, setInitialDeposit] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const createAccount = async () => {
    if (!signer) {
      setMessage("⚠️ Please connect your wallet first.");
      return;
    }

    if (!name || !accountNumber || !initialDeposit || !pin) {
      setMessage("⚠️ All fields are required.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const tx = await contract.createAccount(name, accountNumber, ethers.parseEther(initialDeposit), pin);
      await tx.wait();
      setMessage("✅ Account created successfully!");
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Transaction failed. Check the console for details.");
    }

    setLoading(false);
  };

  return (
    <motion.div
      className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Icon & Heading */}
      <div className="flex items-center justify-center mb-4 text-blue-600 text-3xl">
        <FaUserPlus />
      </div>
      <h2 className="text-xl font-bold text-center text-gray-800 mb-2">
        Create a New Account
      </h2>

      {/* Input Fields */}
      <input
        className="border p-2 w-full rounded mb-2"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border p-2 w-full rounded mb-2"
        placeholder="Account Number"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
      />
      <input
        className="border p-2 w-full rounded mb-2"
        placeholder="Initial Deposit (ETH)"
        value={initialDeposit}
        onChange={(e) => setInitialDeposit(e.target.value)}
      />
      <input
        className="border p-2 w-full rounded mb-4"
        placeholder="PIN"
        type="password"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
      />

      {/* Submit Button */}
      <motion.button
        className={`w-full py-2 text-white font-semibold rounded-md ${
          loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        } transition duration-200`}
        whileHover={!loading ? { scale: 1.05 } : {}}
        whileTap={!loading ? { scale: 0.95 } : {}}
        onClick={createAccount}
        disabled={loading}
      >
        {loading ? "Processing..." : "Create Account"}
      </motion.button>

      {/* Status Message */}
      {message && (
        <motion.div
          className="mt-4 text-center text-sm font-semibold text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {message}
        </motion.div>
      )}
    </motion.div>
  );
};

export default AccountForm;
