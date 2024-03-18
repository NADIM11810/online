import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../../Context/AuthContext";

const AllRecharge = () => {
    const [transactions, setTransactions] = useState([]);
    const { refresh , setRefresh } = useAuthContext();
    useEffect(() => {
        fetch('/api/recharge')
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setTransactions(data.reverse());
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    }, [refresh ]);




    const handleApprove = (id) => {
        fetch(`/api/recharge/approve/${id}`, {
          method: 'PUT',
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Success:', data)
            toast.success('Recharge request approved');
            setRefresh(!refresh);
      })
        .catch((error) => {
            console.error('Error:', error);
            toast.error('Something went wrong!');
        });
    }
    
    return (
        <div>
            <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Transactions</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {transactions.map(transaction => (
          <div key={transaction._id} className="bg-white shadow-md p-6 rounded-lg">
            <p className="text-gray-600"><strong>User ID:</strong> {transaction.userId}</p>
            <p className="text-gray-600"><strong>Amount:</strong> {transaction.amount}tk</p>
            <p className="text-gray-600"><strong>Transaction ID:</strong> {transaction.transId}</p>
            <p className="text-gray-600"><strong>Status:</strong> {transaction.status}</p>
            {transaction.status === 'pending' && (
              <button
                onClick={() => handleApprove(transaction._id)}
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md mt-2 transition duration-300 ease-in-out"
              >
                Approve
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
        </div>
    );
};

export default AllRecharge;