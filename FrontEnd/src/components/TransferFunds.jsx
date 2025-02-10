import { useState } from "react";

function TransferFunds() {
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");

  const handleTransfer = (e) => {
    e.preventDefault();
    console.log("Transferring funds from:", fromAccount, "to:", toAccount, "Amount:", amount, "PIN:", pin);
    // Here, you will later integrate with Ethers.js to call the smart contract function.
  };

  return (
    <div className="bg-white p-5 rounded-lg shadow-md w-80 mt-5">
      <h2 className="text-xl font-semibold mb-3 text-purple-700">Transfer Funds</h2>
      <input 
        type="number" 
        placeholder="Your Account Number" 
        className="w-full p-2 mb-2 border rounded" 
        onChange={(e) => setFromAccount(e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="Recipient Account Number" 
        className="w-full p-2 mb-2 border rounded" 
        onChange={(e) => setToAccount(e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="Amount" 
        className="w-full p-2 mb-2 border rounded" 
        onChange={(e) => setAmount(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="PIN" 
        className="w-full p-2 mb-2 border rounded" 
        onChange={(e) => setPin(e.target.value)} 
      />
      <button 
        onClick={handleTransfer} 
        className="bg-purple-600 text-white px-4 py-2 rounded w-full hover:bg-purple-700 transition">
        Transfer
      </button>
    </div>
  );
}

export default TransferFunds;
