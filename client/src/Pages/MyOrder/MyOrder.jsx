import { useEffect, useState } from "react";
import { useAuthContext } from "../../Context/AuthContext";


const MyOrder = () => {
    const [order, setOrder] = useState([]);
    const { refresh } = useAuthContext();
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await fetch('/api/apply/my-order');
                const data = await response.json();
                setOrder(data.reverse());
            } catch (error) {
                console.error('Error fetching orders:', error.message);
            }
        };
        fetchOrder();
    }, [refresh]);

    const downloadPdf = async (fileUrl) => {
        try {
            const secureFileUrl = fileUrl.replace(/^http:/, 'https:');
            const response = await fetch(secureFileUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'file-1709269093630.pdf');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading PDF:', error);
        }
    };

    return (
        <div>
            <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-10">
                    {order.map((user) => (
                        <div key={user._id} className="mb-4">
                            <p>NID Number: {user.nidNumber}</p>
                            <p>Mobile Number: {user.mobileNumber}</p>
                            {user.status === 'approved' ? (
                                <>
                                    <p className="text-green-500 font-bold mt-2">Status: {user.status}</p>
                                    <button onClick={() => downloadPdf(user.file)} className="text-blue-500 hover:underline">Download File</button>
                                </>
                            ) : (
                                <>
                                    <p className="text-red-500 font-bold mt-2">Status: {user.status}</p>
                                    <p>Note: {user.note}</p>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyOrder;
