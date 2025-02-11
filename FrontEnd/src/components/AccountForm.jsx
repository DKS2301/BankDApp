import { useState } from "react";
import { ethers } from "ethers";
import { motion } from "framer-motion";
import { FaUserPlus, FaCheckCircle, FaTimesCircle, FaSpinner, FaKey, FaEthereum } from "react-icons/fa";

const AccountForm = ({ signer, contract }) => {
  const [name, setName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [initialDeposit, setInitialDeposit] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(0);

  const createAccount = async () => {
    setMessage("");
    setProgress(0);

    if (!contract) {
      setMessage("⚠️ Contract not initialized.");
      return;
    }
    if (!signer) {
      setMessage("⚠️ Please connect your wallet first.");
      return;
    }
    if (!name || !accountNumber || !initialDeposit || !pin) {
      setMessage("⚠️ All fields are required.");
      return;
    }

    try {
      setLoading(true);
      setProgress(25);

      const accountNum = ethers.toBigInt(accountNumber);
      const exists = await contract.accountExistsCheck(accountNum);

      if (exists) {
        setMessage("❌ Account already exists. Please check the account number.");
        setLoading(false);
        return;
      }

      setProgress(50);
      const tx = await contract.createAccount(name, accountNumber, ethers.parseEther(initialDeposit), pin);
      await tx.wait();
      setProgress(100);
      setMessage("✅ Account created successfully!");
    } catch (error) {
      console.error("Error:", error);
      setMessage("❌ Transaction failed. Check details and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="flex flex-col items-center justify-center h-screen ">
      <motion.div className="w-full max-w-lg bg-white/10 backdrop-blur-md shadow-2xl p-8 rounded-3xl border border-white/20 text-white flex flex-col items-center"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}>

        {/* Icon & Title */}
        <motion.h2 className="text-3xl font-bold text-teal-500 mb-6 flex items-center" animate={{ y: [10, 0] }}>
          <FaUserPlus className="mr-3 text-teal-500" /> Create Account
        </motion.h2>

        {/* Progress Bar */}
        {progress > 0 && (
          <motion.div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <motion.div className="bg-teal-500 h-2 rounded-full" style={{ width: `${progress}%` }} />
          </motion.div>
        )}

        {/* Input Fields */}
        {[
          { placeholder: "Full Name", icon: FaUserPlus, state: name, setter: setName },
          { placeholder: "Account Number", icon: FaEthereum, state: accountNumber, setter: setAccountNumber },
          { placeholder: "Initial Deposit (ETH)", icon: FaEthereum, state: initialDeposit, setter: setInitialDeposit },
          { placeholder: "PIN", icon: FaKey, state: pin, setter: setPin, type: "password" }
        ].map(({ placeholder, icon: Icon, state, setter, type }, index) => (
          <div className="relative w-full" key={index}>
            <Icon className="absolute left-3 top-3 text-gray-400" />
            <motion.input type={type || "text"} placeholder={placeholder} value={state}
              className="w-full p-3 pl-10 mb-3 border rounded-lg focus:ring-2 focus:ring-teal-500 transition-all"
              onChange={(e) => setter(e.target.value)}
              whileFocus={{ scale: 1.02 }}
            />
          </div>
        ))}

        {/* Status Messages */}
        {message && (
          <motion.div className={`text-sm mb-2 flex items-center ${message.includes("❌") ? "text-red-600" : "text-green-600"}`}
            animate={{ opacity: 1 }}>
            {message.includes("❌") ? <FaTimesCircle className="mr-2" /> : <FaCheckCircle className="mr-2" />}
            {message}
          </motion.div>
        )}

        {/* Submit Button */}
        <motion.button onClick={createAccount}
          className="bg-teal-600 text-white px-6 py-3 rounded-lg w-full text-lg flex justify-center items-center hover:bg-teal-700 transition disabled:bg-gray-400"
          disabled={loading} whileTap={{ scale: 0.95 }}>
          {loading ? <FaSpinner className="animate-spin" /> : "Create Account"}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default AccountForm;
