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
    <motion.div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-600 to-purple-700 p-6">
      <motion.div className="w-[420px] bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center" 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}>
        
        <motion.h2 className="text-3xl font-bold text-purple-800 mb-6 flex items-center" animate={{ y: [10, 0] }}>
          <FaExchangeAlt className="mr-3 text-purple-700" /> Transfer Funds
        </motion.h2>
        
        {progress > 0 && <motion.div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <motion.div className="bg-purple-600 h-2 rounded-full" style={{ width: `${progress}%` }} />
        </motion.div>}
        
        {[{ placeholder: "Your Account Number", icon: FaEthereum, state: fromAccount, setter: setFromAccount },
          { placeholder: "Recipient Account Number", icon: FaEthereum, state: toAccount, setter: setToAccount },
          { placeholder: "Amount (ETH)", icon: FaExchangeAlt, state: amount, setter: setAmount },
          { placeholder: "PIN", icon: FaKey, state: pin, setter: setPin, type: "password" }].map(({ placeholder, icon: Icon, state, setter, type }, index) => (
          <div className="relative w-full" key={index}>
            <Icon className="absolute left-3 top-3 text-gray-500" />
            <motion.input type={type || "number"} placeholder={placeholder} value={state} 
              className="w-full p-3 pl-10 mb-3 border rounded-lg focus:ring-2 focus:ring-purple-500 transition-all"
              onChange={(e) => setter(e.target.value)}
              whileFocus={{ scale: 1.02 }}
            />
          </div>
        ))}

        {error && <motion.div className="text-red-600 text-sm mb-2 flex items-center" animate={{ opacity: 1 }}>
          <FaTimesCircle className="mr-2" /> {error}
        </motion.div>}
        {success && <motion.div className="text-green-600 text-sm mb-2 flex items-center" animate={{ opacity: 1 }}>
          <FaCheckCircle className="mr-2" /> {success}
        </motion.div>}

        <motion.button onClick={handleTransfer} 
          className="bg-purple-600 text-white px-6 py-3 rounded-lg w-full text-lg flex justify-center items-center hover:bg-purple-700 transition disabled:bg-gray-400"
          disabled={loading} whileTap={{ scale: 0.95 }}>
          {loading ? <FaSpinner className="animate-spin" /> : "Transfer"}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default TransferFunds;
