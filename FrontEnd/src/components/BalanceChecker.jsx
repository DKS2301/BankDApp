function BalanceChecker() {
    return (
      <div className="bg-white p-5 rounded-lg shadow-md w-80 mt-5">
        <h2 className="text-xl font-semibold mb-3">Check Balance</h2>
        <input type="number" placeholder="Account Number" className="w-full p-2 mb-2 border rounded" />
        <input type="password" placeholder="PIN" className="w-full p-2 mb-2 border rounded" />
        <button className="bg-green-600 text-white px-4 py-2 rounded w-full">Check</button>
      </div>
    );
  }
  
  export default BalanceChecker;
  