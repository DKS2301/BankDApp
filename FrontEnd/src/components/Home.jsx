import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaShieldAlt, FaEthereum, FaUsers } from "react-icons/fa";
import logo from "../assets/bank-logo.svg"; // Update your logo path if needed

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-[Montserrat] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 bg-[url('/pattern.svg')] bg-cover bg-center"></div>

      {/* Navbar with Logo and Name */}
      <div className="container mx-auto px-6 py-6 flex items-center justify-between z-10 relative">
        <div className="flex items-center space-x-3">
          <img src={logo} alt="DeFi Vault Logo" className="w-16 h-16" />
          <h1 className="text-2xl font-bold text-teal-400">DeFi Vault</h1>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20 text-center relative z-10">
        {/* Animated Title */}
        <motion.h1
          className="text-6xl md:text-8xl font-extrabold mb-6 leading-tight"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to <span className="text-teal-400">DeFi Vault</span>
        </motion.h1>

        {/* Animated Subtitle */}
        <motion.p
          className="text-lg md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          The future of decentralized finance starts here. Secure, transparent, 
          and borderless banking on the blockchain.
        </motion.p>

        {/* Animated Call-to-Action Buttons */}
        <motion.div
          className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <Link to="/create-account">
            <motion.button
              className="px-8 py-3 bg-teal-500 text-white font-semibold rounded-lg shadow-lg hover:bg-teal-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Create Account
            </motion.button>
          </Link>
          <Link to="/connect-wallet">
            <motion.button
              className="px-8 py-3 bg-emerald-500 text-white font-semibold rounded-lg shadow-lg hover:bg-emerald-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Connect Wallet
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16 relative z-10">
        <motion.h2
          className="text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Why Choose DeFi Vault?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <motion.div
            className="bg-black bg-opacity-30 p-6 rounded-lg shadow-lg text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <FaShieldAlt className="text-5xl text-teal-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Secure</h3>
            <p className="text-gray-300">
              Your assets are protected with top-tier blockchain security.
            </p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            className="bg-black bg-opacity-30 p-6 rounded-lg shadow-lg text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <FaEthereum className="text-5xl text-emerald-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Transparent</h3>
            <p className="text-gray-300">
              All transactions are publicly recorded on the blockchain.
            </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            className="bg-black bg-opacity-30 p-6 rounded-lg shadow-lg text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <FaUsers className="text-5xl text-teal-400 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-4">Decentralized</h3>
            <p className="text-gray-300">
              Own your funds without the need for a middleman.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        className="bg-black bg-opacity-40 py-8 text-center relative z-10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <p className="text-gray-300">
          &copy; {new Date().getFullYear()} DeFi Vault. All rights reserved.
        </p>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="text-teal-400 hover:text-teal-300">
            Twitter
          </a>
          <a href="#" className="text-emerald-400 hover:text-emerald-300">
            GitHub
          </a>
          <a href="#" className="text-teal-400 hover:text-teal-300">
            Discord
          </a>
        </div>
      </motion.footer>
    </div>
  );
};

export default Home;
