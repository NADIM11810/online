import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../../Context/AuthContext";
import Marquee from "react-fast-marquee";


const Tin = () => {
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
    const [formData, setFormData] = useState({
        name: '',
        identifier: '',
        category: 'tin'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (balance < Balance.tinBalance) {
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
                    fetch('/api/users/update-balance-tin', {
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
            <h2 className="text-xl font-bold mb-4">টিন Form</h2>
                <Marquee>
                <h2 className="text-xl font-bold mb-4">💢আপনার একাউন্ট থেকে {Balance.tinBalance}tk কেটে নেয়া হবে ।💢</h2>
                </Marquee>
            <div className="max-w-md mx-auto my-10">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-gray-700">Name (Optional)</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>
                    <div>
                        <label htmlFor="identifier" className="block text-gray-700">TIN/NID/Mobile/Passport (English)</label>
                        <input
                            type="text"
                            id="identifier"
                            name="identifier"
                            value={formData.identifier}
                            onChange={handleChange}
                            required
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        />
                    </div>
                    <div>
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Tin;