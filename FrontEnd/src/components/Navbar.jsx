import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome, FaUserPlus, FaWallet, FaExchangeAlt, FaMoneyBillWave } from "react-icons/fa";

const Navbar = () => {
  const location = useLocation();
  const activePath = location.pathname;

  const menuItems = [
    { path: "/", label: "Home", icon: <FaHome /> },
    { path: "/create-account", label: "Create", icon: <FaUserPlus /> },
    { path: "/check-balance", label: "Balance", icon: <FaWallet /> },
    { path: "/deposit-withdraw", label: "Deposit", icon: <FaMoneyBillWave /> },
    { path: "/transfer-funds", label: "Transfer", icon: <FaExchangeAlt /> },
  ];

  return (
    <nav className="fixed left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-4xl flex flex-col space-y-6 
bg-emerald-500/20  
bg-gradient-to-br from-[#004d40]/60 via-emerald-500/20 to-[#00bfa5]/10
">
      {menuItems.map((item, index) => (
        <motion.div
          key={index}
          className="relative group flex items-center"
          whileHover={{ scale: 1.1 }}
        >
          <Link to={item.path} className="relative flex items-center justify-center w-14 h-14 rounded-full">
            {activePath === item.path && (
              <motion.div
                layoutId="activeIcon"
                className="absolute inset-0 bg-white rounded-full"
                transition={{ type: "spring", stiffness: 500, damping: 50 }}
              />
            )}
            <div className={`relative z-10 text-2xl ${
                activePath === item.path ? "text-black opacity-80" : "text-white opacity-50"
              }`}>
              {item.icon}
            </div>
          </Link>
          <span className="absolute left-16 bg-gray-900 text-white px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {item.label}
          </span>
        </motion.div>
      ))}
    </nav>
  );
};

export default Navbar;
