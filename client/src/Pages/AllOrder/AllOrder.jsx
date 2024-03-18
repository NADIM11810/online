import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../../Context/AuthContext";
const AllOrder = () => {
    const { refresh, setRefresh } = useAuthContext();
    const [orders, setOrders] = useState([]);
    const [action, setAction] = useState("delivery"); // Default action is delivery
    const [file, setFile] = useState(null);
    const [note, setNote] = useState('');
    const [loader , setLoader] = useState(false);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch('/api/apply/order');
                const data = await response.json();
                setOrders(data.reverse());
            } catch (error) {
                console.error('Error fetching orders:', error.message);
            }
        };
        fetchOrders();
    }, [refresh]);

    const handleToggleAction = () => {
        // Toggle between "delivery" and "cancel"
        setAction(prevAction => prevAction === "delivery" ? "cancel" : "delivery");
    };

    const handleDelivery = async (orderId) => {
        
        
        const formData = new FormData();
        formData.append('file', file);
        try {
            setLoader(true);
            const response = await fetch(`/api/apply/update-form/${orderId}`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to update Apply');
            }
            setRefresh(!refresh);
            toast.success('Apply updated successfully');
            setLoader(false);
            // Handle success, maybe redirect or show a success message
        } catch (error) {
            console.error('Error updating Apply:', error.message);
            // Handle error, maybe show an error message to the user
        }

    };

    const handleCancel = (orderId) => {
        setRefresh(!refresh);
        fetch(`/api/apply/order/${orderId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ status: 'cancel', note }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update Apply');
                }
                setRefresh(!refresh);
                toast('Apply updated successfully');
                // Handle success, maybe redirect or show a success message
            })
            .catch(error => {
                console.error('Error updating Apply:', error.message);
                toast.error('Something went wrong!');
                // Handle error, maybe show an error message to the user
            });
    };

    return (
        <div>
            <div className="container mx-auto m-10">
                <h1 className="text-2xl font-bold mb-4">Data List</h1>
                {
                    loader ? <h1>loading.......</h1> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    {orders.map(item => (
                        <div key={item._id} className="bg-white rounded shadow p-4">
                            <p className="text-lg font-semibold mb-2">NID Number: {item.nidNumber}</p>
                            <p>Mobile Number: {item.mobileNumber}</p>
                            <p>Birthday: {new Date(item.birthday).toLocaleDateString()}</p>
                            <p>Status: {item.status}</p>
                            {item.status === "pending" && (
                                <div>
                                    {action === "delivery" ? <di>
                                        <input type="file" className="border rounded p-1 mb-1" onChange={(e) => setFile(e.target.files[0])} />
                                        <button onClick={() => handleDelivery(item._id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">Delivery</button>
                                    </di> : <div><input type="text" placeholder="Enter text" className="border rounded p-1 mb-1" value={note}
                                        onChange={(event) => setNote(event.target.value)} />

                                        <button onClick={() => handleCancel(item._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Cancel</button></div>
                                    }
                                    <button onClick={handleToggleAction} className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">Toggle {action === "delivery" ? "Cancel" : "Delivery"}</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                }

            </div>
        </div>
    );
};

export default AllOrder;
