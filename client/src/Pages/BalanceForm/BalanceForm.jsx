import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const BalanceForm = () => {
  const [nidBalance, setNidBalance] = useState('');
  const [serverBalance, setServerBalance] = useState('');
  const [birthBalance, setBirthBalance] = useState('');
  const [tinBalance, setTinBalance] = useState('');
  const [bioBalance, setBioBalance] = useState('');
  const [roshidBalance, setRoshidBalance] = useState('');
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
      toast.success('NID Balance updated successfully!');
      setLoading(!loading);
    } catch (error) {
      console.error('Error updating NID balance:', error.message);
      toast.error('Something went wrong while updating NID Balance!');
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
      toast.success('Server Balance updated successfully!');
      setLoading(!loading);
    } catch (error) {
      console.error('Error updating Server balance:', error.message);
      toast.error('Something went wrong while updating Server Balance!');
    }
  };

  const handleBirthBalanceUpdate = async () => {
    // Add logic to update birth balance
    console.log('Updating Birth balance:', birthBalance);
    try {
      const response = await fetch('/api/balance/update-birth-balance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ birthBalance }),
      });
      const data = await response.json();
      console.log(data);
      toast.success('Birth Balance updated successfully!');
      setLoading(!loading);
    } catch (error) {
      console.error('Error updating Birth balance:', error.message);
      toast.error('Something went wrong while updating Birth Balance!');
    }
  };

  const handleTinBalanceUpdate = async () => {
    // Add logic to update tin balance
    console.log('Updating Tin balance:', tinBalance);
    try {
      const response = await fetch('/api/balance/update-tin-balance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tinBalance }),
      });
      const data = await response.json();
      console.log(data);
      toast.success('Tin Balance updated successfully!');
      setLoading(!loading);
    } catch (error) {
      console.error('Error updating Tin balance:', error.message);
      toast.error('Something went wrong while updating Tin Balance!');
    }
  };

  const handleBioBalanceUpdate = async () => {
    // Add logic to update bio balance
    console.log('Updating Bio balance:', bioBalance);
    try {
      const response = await fetch('/api/balance/update-bio-balance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bioBalance }),
      });
      const data = await response.json();
      console.log(data);
      toast.success('Bio Balance updated successfully!');
      setLoading(!loading);
    } catch (error) {
      console.error('Error updating Bio balance:', error.message);
      toast.error('Something went wrong while updating Bio Balance!');
    }
  };

  const handleRoshidBalanceUpdate = async () => {
    // Add logic to update roshid balance
    console.log('Updating Roshid balance:', roshidBalance);
    try {
      const response = await fetch('/api/balance/update-roshid-balance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roshidBalance }),
      });
      const data = await response.json();
      console.log(data);
      toast.success('Roshid Balance updated successfully!');
      setLoading(!loading);
    } catch (error) {
      console.error('Error updating Roshid balance:', error.message);
      toast.error('Something went wrong while updating Roshid Balance!');
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
              <li>birthBalance: {balance.birthBalance}</li>
              <li>tinBalance: {balance.tinBalance}</li>
              <li>bioBalance: {balance.bioBalance}</li>
              <li>roshidBalance: {balance.roshidBalance}</li>
            </ul>
          </div>
        </div>
      </div>
      <div  className='grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 gap-10 my-10'>
        <div><input
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
          </button></div>
        <div><input
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

          </button></div>
        <div><input
          type="text"
          className="border border-gray-400 rounded-md p-2 mt-4"
          placeholder="Enter Birth Balance"
          value={birthBalance}
          onChange={(e) => setBirthBalance(e.target.value)}
        />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleBirthBalanceUpdate}
          >
            Update Birth Balance
          </button></div>
        <div><input
          type="text"
          className="border border-gray-400 rounded-md p-2 mt-4"
          placeholder="Enter Tin Balance"
          value={tinBalance}
          onChange={(e) => setTinBalance(e.target.value)}
        />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleTinBalanceUpdate}
          >
            Update Tin Balance
          </button></div>
        <div><input
          type="text"
          className="border border-gray-400 rounded-md p-2 mt-4"
          placeholder="Enter Bio Balance"
          value={bioBalance}
          onChange={(e) => setBioBalance(e.target.value)}
        />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleBioBalanceUpdate}
          >
            Update Bio Balance
          </button></div>
          <div><input
            type="text"
            className="border border-gray-400 rounded-md p-2 mt-4"
            placeholder="Enter Roshid Balance"
            value={roshidBalance}
            onChange={(e) => setRoshidBalance(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleRoshidBalanceUpdate}
          >
            Update Roshid Balance
          </button></div>
      </div>
    </div>
  );
};

export default BalanceForm;
