import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../../Context/AuthContext";
import Marquee from "react-fast-marquee";

const Recharge = () => {
    const [amount, setAmount] = useState('');
    const [transId, setTransId] = useState('');
    const { refresh , setRefresh } = useAuthContext();
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { amount, transId };
        if(amount<299){
            toast.error('Minimum recharge amount is 300!');
        }
        else{
            fetch('/api/recharge', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Success:', data);
                    toast.success('successfully recharged!');
                    setRefresh(!refresh);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    toast.error('Something went wrong!');
            });
            setAmount('');
            setTransId('');
        }
    };
    return (
        <div>
            <div className="max-w-md mx-auto my-10">
                <Marquee pauseOnHover={true}>
                    <h1 className="text-xl  text-center">(01600644830) এই নম্বরে বিকাশ পেমেন্ট করে ইনফরমেশন  প্রদান করুন।।  </h1>
                </Marquee>
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                            Amount
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="amount"
                            type="text"
                            placeholder="Enter Amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="transId">
                            Transaction ID
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="transId"
                            type="text"
                            placeholder="Enter Transaction ID"
                            value={transId}
                            onChange={(e) => setTransId(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Recharge
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Recharge;