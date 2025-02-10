import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-700 text-white font-[Montserrat]">
      {/* Logo Section */}
      <motion.svg
      className="w-64 h-64"
      viewBox="0 0 200 200"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Circle */}
      <motion.circle
        cx="100"
        cy="100"
        r="90"
        fill="#4F46E5"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      />

      {/* Bank Building */}
      <motion.rect
        x="70"
        y="80"
        width="60"
        height="60"
        fill="#FFFFFF"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      />

      {/* Bank Door */}
      <motion.rect
        x="90"
        y="110"
        width="20"
        height="30"
        fill="#4F46E5"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      />

      {/* Bank Windows */}
      <motion.rect
        x="75"
        y="85"
        width="10"
        height="10"
        fill="#4F46E5"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      />
      <motion.rect
        x="115"
        y="85"
        width="10"
        height="10"
        fill="#4F46E5"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      />

      {/* Blockchain Nodes */}
      <motion.circle
        cx="50"
        cy="50"
        r="10"
        fill="#10B981"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      />
      <motion.circle
        cx="150"
        cy="50"
        r="10"
        fill="#10B981"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      />
      <motion.circle
        cx="50"
        cy="150"
        r="10"
        fill="#10B981"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.4, duration: 0.5 }}
      />
      <motion.circle
        cx="150"
        cy="150"
        r="10"
        fill="#10B981"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.6, duration: 0.5 }}
      />
    </motion.svg>

      {/* Animated Title */}
      <motion.h1
        className="text-5xl font-extrabold text-center tracking-wide"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Welcome to Bank DApp
      </motion.h1>

      {/* Animated Subtitle */}
      <motion.p
        className="text-lg mt-4 mb-8 text-center max-w-xl tracking-wide"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2 }}
      >
        A decentralized banking system that ensures security, transparency, and seamless transactions.
      </motion.p>

      {/* Call-to-Action Buttons */}
      <motion.div
        className="flex space-x-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.3 }}
      >
        <Link to="/create-account">
          <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition">
            Create Account
          </button>
        </Link>

        <Link to="/check-balance">
          <button className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition">
            Check Balance
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default Home;
