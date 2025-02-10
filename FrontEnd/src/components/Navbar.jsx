import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = ({ signer }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [activePath, setActivePath] = useState(location.pathname);

  // Update active path on route change and close menu on navigation
  useEffect(() => {
    setActivePath(location.pathname);
    setIsMobileMenuOpen(false); // Auto-close mobile menu on navigation
  }, [location]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const menuItems = [
    { path: "/", label: "Home" },
    { path: "/create-account", label: "Create Account" },
    { path: "/check-balance", label: "Check Balance" },
    { path: "/deposit-withdraw", label: "Deposit/Withdraw" },
    { path: "/transfer-funds", label: "Transfer" },
  ];

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-4 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <motion.h1
          className="text-xl font-bold cursor-pointer"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          onClick={() => navigate("/")}
        >
          Bank DApp
        </motion.h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {menuItems.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                to={item.path}
                className={`relative transition-colors duration-300 px-3 py-1 rounded ${
                  activePath === item.path ? "text-yellow-300 font-bold" : "hover:text-gray-200"
                }`}
              >
                {item.label}
                {activePath === item.path && (
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-300 rounded"
                    layoutId="underline"
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Wallet Connection / Sign-In Button */}
        <button
          className="hidden md:block bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-gray-200 transition"
          onClick={() => navigate(signer ? "/dashboard" : "/connect-wallet")}
        >
          {signer ? "Dashboard" : "Connect Wallet"}
        </button>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-2xl focus:outline-none"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden mt-4 space-y-3 bg-blue-900 p-4 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  to={item.path}
                  className={`block p-2 rounded transition-colors duration-300 ${
                    activePath === item.path ? "bg-white text-blue-700 font-bold" : "hover:bg-blue-600"
                  }`}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}

            {/* Wallet Button for Mobile */}
            <button
              className="w-full bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-gray-200 transition"
              onClick={() => navigate(signer ? "/dashboard" : "/connect-wallet")}
            >
              {signer ? "Dashboard" : "Connect Wallet"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
