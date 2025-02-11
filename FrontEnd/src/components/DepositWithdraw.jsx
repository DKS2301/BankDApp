import { useState } from "react";
import { ethers } from "ethers";
import { motion } from "framer-motion";
import { FaMoneyBillWave, FaArrowDown, FaArrowUp } from "react-icons/fa";

const DepositWithdraw = ({ signer, contract }) => {
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [pin, setPIN] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleTransaction = async (type) => {
    if (!signer) {
      setError("⚠️ Please connect your wallet first!");
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
      const tx =
        type === "deposit"
          ? await contract.deposit(accountNumber, ethers.parseEther(amount), pin)
          : await contract.withdraw(accountNumber, ethers.parseEther(amount), pin);

      await tx.wait();
      setSuccessMessage(`✅ ${type === "deposit" ? "Deposit" : "Withdrawal"} successful!`);
    } catch (error) {
      console.error("Transaction Error:", error);
      setError("❌ Transaction failed. Try again!");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        className="backdrop-blur-md bg-white/10 p-8 rounded-xl shadow-xl w-full max-w-lg text-white text-center border border-gray-600"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <h2 className="text-3xl font-bold mb-6 flex text-teal-400 items-center justify-center"> Deposit / Withdraw
        </h2>

        {/* Inputs */}
        <div className="space-y-4">
          <input
            type="number"
            placeholder="Account Number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 text-white placeholder-gray-400"
          />
          <input
            type="number"
            placeholder="Amount (ETH)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 text-white placeholder-gray-400"
          />
          <input
            type="password"
            placeholder="PIN"
            value={pin}
            onChange={(e) => setPIN(e.target.value)}
            className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-400 text-white placeholder-gray-400"
          />
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col space-y-3">
          <motion.button
            className="bg-green-500 text-white px-6 py-3 rounded-lg flex items-center justify-center shadow-lg transition-transform transform hover:scale-105"
            onClick={() => handleTransaction("deposit")}
            disabled={loading}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? "Processing..." : <><FaArrowDown className="mr-2" /> Deposit</>}
          </motion.button>

          <motion.button
            className="bg-red-500 text-white px-6 py-3 rounded-lg flex items-center justify-center shadow-lg transition-transform transform hover:scale-105"
            onClick={() => handleTransaction("withdraw")}
            disabled={loading}
            whileTap={{ scale: 0.95 }}
          >
            {loading ? "Processing..." : <><FaArrowUp className="mr-2" /> Withdraw</>}
          </motion.button>
        </div>

        {/* Messages */}
        {error && (
          <motion.div
            className="mt-4 text-red-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ❌ {error}
          </motion.div>
        )}

        {successMessage && (
          <motion.div
            className="mt-4 text-green-400 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ✅ {successMessage}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default DepositWithdraw;
