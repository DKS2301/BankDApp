import { useState } from "react";
import { ethers } from "ethers";
import { motion } from "framer-motion";
import { FaEthereum, FaExchangeAlt, FaKey, FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";

const TransferFunds = ({ contract, signer }) => {
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [progress, setProgress] = useState(0);

  const handleTransfer = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setProgress(0);

    if (!fromAccount || !toAccount || !amount || !pin) {
      setError("⚠️ All fields are required.");
      return;
    }
    if (fromAccount === toAccount) {
      setError("⚠️ Sender and recipient cannot be the same.");
      return;
    }
    if (Number(amount) <= 0) {
      setError("⚠️ Amount must be greater than zero.");
      return;
    }
    if (!signer) {
      setError("⚠️ Wallet not connected. Please connect your wallet.");
      return;
    }

    if (!window.confirm(`Confirm transfer of ${amount} ETH from ${fromAccount} to ${toAccount}?`)) return;

    try {
      setLoading(true);
      setProgress(25);
      
      const amountInWei = ethers.parseEther(amount);
      const tx = await contract.transfer(fromAccount, toAccount, amountInWei, pin);
      setProgress(50);
      
      await tx.wait();
      setProgress(100);
      
      setSuccess("✅ Transfer successful!");
    } catch (err) {
      setError("❌ Transaction failed. Check details and try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="flex items-center justify-center min-h-screen bg-[url('/pattern.svg')] bg-cover bg-center relative">
      {/* Glassmorphic Card */}
      <motion.div className="backdrop-blur-md bg-white/10 p-8 rounded-xl shadow-xl w-full max-w-lg text-white text-center border border-gray-600"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2 className="text-3xl font-bold text-teal-400 mb-6 flex items-center"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <FaExchangeAlt className="mr-2 text-teal-400" /> Transfer Funds
        </motion.h2>

        {/* Progress Bar */}
        {progress > 0 && (
          <motion.div className="w-full bg-gray-300 rounded-full h-2 mb-4">
            <motion.div className="bg-teal-500 h-2 rounded-full" style={{ width: `${progress}%` }} />
          </motion.div>
        )}

        {/* Input Fields */}
        {[
          { placeholder: "Your Account Number", icon: FaEthereum, state: fromAccount, setter: setFromAccount },
          { placeholder: "Recipient Account Number", icon: FaEthereum, state: toAccount, setter: setToAccount },
          { placeholder: "Amount (ETH)", icon: FaExchangeAlt, state: amount, setter: setAmount },
          { placeholder: "PIN", icon: FaKey, state: pin, setter: setPin, type: "password" }
        ].map(({ placeholder, icon: Icon, state, setter, type }, index) => (
          <div className="relative w-full" key={index}>
            <Icon className="absolute left-3 top-3 text-gray-400" />
            <motion.input type={type || "number"} placeholder={placeholder} value={state} 
              className="w-full p-3 pl-10 mb-4 bg-transparent border border-teal-400 text-white rounded-lg focus:ring-2 focus:ring-teal-500"
              onChange={(e) => setter(e.target.value)}
              whileFocus={{ scale: 1.02 }}
            />
          </div>
        ))}

        {/* Error and Success Messages */}
        {error && (
          <motion.div className="flex items-center text-red-400 text-sm mb-2"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FaTimesCircle className="mr-2" /> {error}
          </motion.div>
        )}
        {success && (
          <motion.div className="flex items-center text-green-400 text-sm mb-2"
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <FaCheckCircle className="mr-2" /> {success}
          </motion.div>
        )}

        {/* Transfer Button */}
        <motion.button onClick={handleTransfer}
          className="w-full px-6 py-3 text-lg flex justify-center items-center rounded-lg shadow-lg transition duration-300 bg-teal-500 hover:bg-teal-600 text-white"
          disabled={loading}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? <FaSpinner className="animate-spin" /> : "Transfer"}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default TransferFunds;
