import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const BalanceForm = () => {
  const [nidBalance, setNidBalance] = useState('');
  const [serverBalance, setServerBalance] = useState('');
  const [balance, setBalance] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch('/api/balance');
        const data = await response.json();
        setBalance(data);
        
      } catch (error) {
        console.error('Error fetching balance:', error.message);
      }
    };
    fetchBalance();
  }, [loading]);



  const handleNidBalanceUpdate = async () => {
    // Add logic to update NID balance
    console.log('Updating NID balance:', nidBalance);
    try {
      const response = await fetch('/api/balance/update-nid-balance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nidBalance }),
      });
      const data = await response.json();
      console.log(data);
      toast.success('Balance updated successfully!');
      setLoading(!loading);
    } catch (error) {
      console.error('Error updating password:', error.message);
      toast.error('Something went wrong!');
    }
  };

  const handleServerBalanceUpdate = async () => {
    // Add logic to update server balance
    console.log('Updating Server balance:', serverBalance);
    try {
      const response = await fetch('/api/balance/update-server-balance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ serverBalance }),
      });
      const data = await response.json();
      console.log(data);
      toast.success('Balance updated successfully!');
      setLoading(!loading);
    } catch (error) {
      console.error('Error updating password:', error.message);
      toast.error('Something went wrong!');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <div className=" bg-gray-200 flex justify-center items-center">
        <div className="bg-white p-8 rounded-md shadow-md">
        <div>
      <h2 className="text-lg font-semibold mb-2">Balance:</h2>
      <ul className="list-disc pl-5">
        <li>nidBalance: {balance.nidBalance}</li>
        <li>serverBalance: {balance.serverBalance}</li>
      </ul>
    </div>
        </div>
      </div>
      <input
        type="text"
        className="border border-gray-400 rounded-md p-2 mb-4"
        placeholder="Enter NID Balance"
        value={nidBalance}
        onChange={(e) => setNidBalance(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleNidBalanceUpdate}
      >
        Update NID Balance
      </button>
      <input
        type="text"
        className="border border-gray-400 rounded-md p-2 mt-4"
        placeholder="Enter Server Balance"
        value={serverBalance}
        onChange={(e) => setServerBalance(e.target.value)}
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={handleServerBalanceUpdate}
      >
        Update Server Balance
      </button>
    </div>
  );
};

export default BalanceForm;
