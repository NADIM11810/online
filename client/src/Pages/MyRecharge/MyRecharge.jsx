import { useEffect, useState } from "react";


const MyRecharge = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        // Fetch data from your API or use a mock data
        const fetchData = async () => {
            try {
                const response = await fetch('/api/recharge/my-recharge');
                const data = await response.json();
                setTransactions(data.reverse());
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
    return (
        <div>
            <div className=" mx-auto mt-8">
                <h1 className="text-3xl font-semibold mb-4">Transaction List</h1>
                <table className="w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Transaction ID
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Amount
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {transactions.map(transaction => (
                            <tr key={transaction._id}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {transaction.transId}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {transaction.amount}tk
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {transaction.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyRecharge;