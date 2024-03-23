import { useEffect, useState } from "react";
import { useAuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import useLogout from "../../Hooks/useLogout";


const Navbar = () => {
    const { logout } = useLogout();
    const { refresh, authUser, setBalance } = useAuthContext();
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('/api/users/userInfo')
            .then((response) => response.json())
            .then((data) => {
                setData(data.user);
                setBalance(data.user.balance);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [refresh, setBalance]);
    return (
        <div className="sticky top-0 z-10 shadow-black shadow-sm">
            <div className="navbar bg-base-100 px-10 ">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <p className="m-4  text-[12px]">অপশনস</p>
                            {
                            authUser && authUser.role === 'user' && <>
                            <li><Link to="/server-copy"><button className=" w-full mx-5 my-2">
                                সার্ভার কপি</button></Link></li>
                            <li><Link to="/nid-order"><button className=" w-full mx-5 my-2">
                                NID কপি</button></Link></li>
                            <li><Link to="/birthday-registration"><button className="w-full mx-5 my-2">
                                    জন্ম নিবন্ধন</button></Link></li>
                            <li><Link to="/tin"><button className="w-full mx-5 my-2">
                                    টিন</button></Link></li>
                            <li><Link to="/bio"><button className="w-full mx-5 my-2">
                                    বায়োমেট্রিক</button></Link></li>
                            <li><Link to="/roshid"><button className="w-full mx-5 my-2">
                                    রশিদ</button></Link></li>
                            <li><Link to="/recharge"><button className=" w-full mx-5 my-2">
                                রিচার্জ</button></Link></li>
                            <li><Link to="/my-order"><button className=" w-full mx-5 my-2">
                                My Order</button></Link></li>
                            <li><Link to="/my-recharge"><button className=" w-full mx-5 my-2">
                                My Recharge</button></Link></li>
                            <li><Link to="https://t.me/unofficial724"><button className="w-full mx-5 my-2">
                                টেলিগ্রাম</button></Link></li>
                            </>}
                            {
                            authUser && authUser.role === 'admin' && <>
                            <li><Link to="/all-order"><button className="w-full mx-5 my-2">
                                All Order</button></Link></li>
                            <li> <Link to="/all-recharge"><button className="w-full mx-5 my-2">
                                All Recharge</button></Link></li>
                            <li><Link to="/all-user"><button className="w-full mx-5 my-2">
                                    All User</button></Link></li>
                            <li><Link to="/update-balance"><button className="w-full mx-5 my-2">
                                    Update Balance</button></Link></li>
                            <li><Link to="/notice"><button className="w-full mx-5 my-2">
                                    Update Notice</button></Link></li>
                            <li><Link to="/signup"><button className="w-full mx-5 my-2">
                                Add Account</button></Link></li>
                            
                            </>}
                            <p className="m-4 text-[12px]">একাউন্ট</p>
                            <li><Link to="/profile"><button className="w-full mx-5 my-2">
                            প্রোফাইল</button></Link></li>
                            <li><Link to="/update-password"><button className="w-full mx-5 my-2">
                            পাসওয়ার্ড পরিবর্তন</button></Link></li>
                            <li><button className="w-full mx-5 my-2" onClick={() => logout()}>
                            লগ আউট</button></li>
                        </ul>
                    </div>
                    <a className="btn btn-ghost text-xl">Unofficial</a>
                </div>

                <div className="navbar-end">
                    <h1 className="mr-0 lg:mr-10 md:mr-10 ml-4 lg:ml-0 md:ml-0 bg-teal-600 px-4 py-2 rounded-lg">Balance: {data?.balance}</h1>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src={authUser?.profilePic} />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <Link to="/profile" className="p-2">Profile</Link>
                            </li>
                            <li><a onClick={() => logout()}>Logout</a></li>
                        </ul>
                    </div>

                </div>
            </div>
        </div >
    );
};

export default Navbar;