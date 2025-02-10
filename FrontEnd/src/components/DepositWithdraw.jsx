import { useState } from "react";
import { ethers } from "ethers";
import { contractAddress } from "../config";
import { contractABI } from "../contractABI";
import { motion } from "framer-motion";
import { FaMoneyBillWave, FaArrowDown, FaArrowUp } from "react-icons/fa";

const DepositWithdraw = ({ signer }) => {
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleTransaction = async (type) => {
    if (!signer) {
      setError("❌ Please connect your wallet first!");
      return;
    }
    if (!accountNumber || !amount || amount <= 0) {
      setError("⚠️ Please enter valid details!");
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const tx = 
        type === "deposit"
          ? await contract.deposit(accountNumber, ethers.parseEther(amount))
          : await contract.withdraw(accountNumber, ethers.parseEther(amount));

      await tx.wait();
      setSuccessMessage(`✅ ${type === "deposit" ? "Deposit" : "Withdrawal"} successful!`);
    } catch (error) {
      console.error("Transaction Error:", error);
      setError("❌ Transaction failed. Try again!");
    }

    setLoading(false);
  };

  return (
    <motion.div
      className="bg-white p-10 rounded-lg shadow-md w-150  mt-10 flex flex-col items-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <h2 className="text-xl font-semibold mb-3 flex items-center">
        <FaMoneyBillWave className="mr-2 text-green-500" /> Deposit / Withdraw
      </h2>

      {/* Inputs */}
      <input
        type="number"
        placeholder="Account Number"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
        className="w-full p-2 mb-2 border rounded focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        placeholder="Amount (ETH)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 mb-2 border rounded focus:ring-2 focus:ring-blue-500"
      />

      {/* Buttons */}
      <motion.button
        className="bg-yellow-600 text-white px-4 py-2 rounded w-full flex items-center justify-center"
        onClick={() => handleTransaction("deposit")}
        disabled={loading}
        whileHover={!loading ? { scale: 1.05 } : {}}
        whileTap={!loading ? { scale: 0.95 } : {}}
      >
        {loading ? "Processing..." : <><FaArrowDown className="mr-2" /> Deposit</>}
      </motion.button>

      <motion.button
        className="bg-red-600 text-white px-4 py-2 rounded w-full mt-2 flex items-center justify-center"
        onClick={() => handleTransaction("withdraw")}
        disabled={loading}
        whileHover={!loading ? { scale: 1.05 } : {}}
        whileTap={!loading ? { scale: 0.95 } : {}}
      >
        {loading ? "Processing..." : <><FaArrowUp className="mr-2" /> Withdraw</>}
      </motion.button>

      {/* Error Message */}
      {error && (
        <motion.div
          className="mt-3 text-red-600 text-sm flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          ❌ {error}
        </motion.div>
      )}

      {/* Success Message */}
      {successMessage && (
        <motion.div
          className="mt-3 text-green-600 text-sm flex items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          ✅ {successMessage}
        </motion.div>
      )}
    </motion.div>
  );
};

export default DepositWithdraw;
