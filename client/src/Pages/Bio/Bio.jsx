import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../../Context/AuthContext";
import Marquee from "react-fast-marquee";

const Bio = () => {
    const [operator, setOperator] = useState(''); // State to store selected operator
    const [number, setNumber] = useState(''); // State to store input number
    const { refresh , setRefresh, balance  } = useAuthContext();
    const [Balance, setBalance] = useState({});
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
      }, []);
    // Function to handle select option change
    const handleOperatorChange = (e) => {
        setOperator(e.target.value);
    };

    // Function to handle input number change
    const handleNumberChange = (e) => {
        setNumber(e.target.value);
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Do something with the selected operator and input number, like submitting to a server
        const category = 'bio';
        console.log('Selected Operator:', operator);
        console.log('Input Number:', number);
        const formData = {
            operator,
            number,
            category
        };
        
        if (balance < Balance.bioBalance) {
            toast.error('Insufficient balance!');
        }
        else{
            fetch('/api/apply/order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then((response) => response.json())
                .then((data) => {
                    fetch('/api/users/update-balance-bio', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        
                    })
                        .then((response) => response.json())
                        .then((data) => {
                            console.log('Success:', data);
                            toast.success('Order placed successfully!');
                            setRefresh(!refresh);
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                            toast.error('Something went wrong!');
                        });
                })
                .catch((error) => {
                    console.error('Error:', error);
                    toast.error('Something went wrong!');
            });
        }
    };
    return (
        <div>
            <h2 className="text-xl font-bold mb-4">বায়োমেট্রিক Form</h2>
                <Marquee>
                <h2 className="text-xl font-bold mb-4">💢আপনার একাউন্ট থেকে {Balance.bioBalance}tk কেটে নেয়া হবে ।💢</h2>
                </Marquee>
            <div className="max-w-md mx-auto">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label htmlFor="operator" className="block text-gray-700 text-sm font-bold mb-2">
                            Select Operator
                        </label>
                        <select
                            id="operator"
                            name="operator"
                            value={operator}
                            onChange={handleOperatorChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        >
                            <option value="">Select an operator</option>
                            <option value="রবি">রবি</option>
                            <option value="এয়ারটেল">এয়ারটেল</option>
                            <option value="GP">GP</option>
                            <option value="Banglalink">Banglalink</option>
                            <option value="Teletalk">Teletalk</option>
                        </select>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="number" className="block text-gray-700 text-sm font-bold mb-2">
                            Enter Number
                        </label>
                        <input
                            type="text"
                            id="number"
                            name="number"
                            value={number}
                            onChange={handleNumberChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter your number"
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Bio;