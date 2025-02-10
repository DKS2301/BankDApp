import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="bg-blue-700 text-white p-4 shadow-lg">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">Bank DApp</h1>
        <div className="flex space-x-4">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          <Link to="/create-account" className="hover:text-gray-200">Create Account</Link>
          <Link to="/check-balance" className="hover:text-gray-200">Check Balance</Link>
          <Link to="/deposit-withdraw" className="hover:text-gray-200">Deposit/Withdraw</Link>
          <Link to="/transfer-funds" className="hover:text-gray-200">Transfer</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
