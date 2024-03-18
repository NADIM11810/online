import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const AllUser = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const getUsers = async () => {
            try {
                const res = await fetch("/api/users");
                const data = await res.json();
                setUsers(data);
            } catch (err) {
                console.log(err);
            }
        };
        getUsers();
    }, []);
    const handleDelete = async (userId) => {
        try {
            const res = await fetch(`/api/users/users/${userId}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (res.status === 200) {
                const newUsers = users.filter((user) => user._id !== userId);
                setUsers(newUsers);
                toast.success(data.message);
            }
        } catch (err) {
            console.log(err);
        }
        
      };
    return (
       <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map(user => (
          <div key={user._id} className="max-w-md mx-auto bg-white rounded-xl overflow-hidden shadow-md md:max-w-2xl">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img className="h-48 w-full object-cover md:w-48" src={user.profilePic} alt={user.fullName} />
            </div>
            <div className="p-8">
              <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{user.username}</div>
              <p className="mt-2 text-gray-600">{user.fullName}</p>
              <p className="mt-2 text-gray-600">{user.gender}</p>
              <p className="mt-2 text-gray-600">Balance: {user.balance}</p>
              <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleDelete(user._id)}>Delete</button>
              
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
    );
};

export default AllUser;