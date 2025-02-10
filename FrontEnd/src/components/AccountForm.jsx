import { useState } from "react";
import { ethers } from "ethers";
import { contractAddress } from "../config";
import { contractABI } from "../contractABI";
const AccountForm = ({ signer }) => {
  const [name, setName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [initialDeposit, setInitialDeposit] = useState("");
  const [pin, setPin] = useState("");

  const createAccount = async () => {
    if (!signer) {
      alert("Connect MetaMask first!");
      return;
    }

    try {
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const tx = await contract.createAccount(name, accountNumber, ethers.parseEther(initialDeposit), pin);
      await tx.wait();
      alert("Account created successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert("Transaction failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-gray-100 rounded shadow">
      <h2 className="text-xl font-bold">Create Account</h2>
      <input className="border p-2 w-full" placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input className="border p-2 w-full mt-2" placeholder="Account Number" onChange={(e) => setAccountNumber(e.target.value)} />
      <input className="border p-2 w-full mt-2" placeholder="Initial Deposit (ETH)" onChange={(e) => setInitialDeposit(e.target.value)} />
      <input className="border p-2 w-full mt-2" placeholder="PIN" type="password" onChange={(e) => setPin(e.target.value)} />
      <button className="bg-blue-500 text-white px-4 py-2 mt-4" onClick={createAccount}>
        Create Account
      </button>
    </div>
  );
};

export default AccountForm;
