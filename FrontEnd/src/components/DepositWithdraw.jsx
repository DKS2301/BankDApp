function DepositWithdraw() {
    return (
      <div className="bg-white p-5 rounded-lg shadow-md w-80 mt-5">
        <h2 className="text-xl font-semibold mb-3">Deposit / Withdraw</h2>
        <input type="number" placeholder="Account Number" className="w-full p-2 mb-2 border rounded" />
        <input type="number" placeholder="Amount" className="w-full p-2 mb-2 border rounded" />
        <button className="bg-yellow-600 text-white px-4 py-2 rounded w-full">Deposit</button>
        <button className="bg-red-600 text-white px-4 py-2 rounded w-full mt-2">Withdraw</button>
      </div>
    );
  }
  
  export default DepositWithdraw;
  