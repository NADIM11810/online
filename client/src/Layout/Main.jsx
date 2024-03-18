import Navbar from "../components/Navbar/Navbar";
import { Link, Outlet } from "react-router-dom";
import Notice from "../components/Notice/Notice";
import useLogout from "../Hooks/useLogout";
import { useAuthContext } from "../Context/AuthContext";

const Main = () => {
    const { logout } = useLogout();
    const { authUser } = useAuthContext();
    return (
        <div>
            <Navbar />
            <div className="flex">
                <div className="hidden md:block lg:block w-2/12 min-h-screen border-r-2 border-gray-950  sticky left-0">
                    <div>
                        <p className="m-4  text-[12px]">অপশনস</p>
                        {
                            authUser && authUser.role === 'user' && <>
                                <Link to="/server-copy"><button className="btn w-3/4 mx-5 my-2">
                                    সার্ভার কপি</button></Link>
                                <Link to="/nid-order"><button className="btn w-3/4 mx-5 my-2">
                                    NID কপি</button></Link>
                                <Link to="/recharge"><button className="btn w-3/4 mx-5 my-2">
                                    রিচার্জ</button></Link>
                                <Link to="/my-order"><button className="btn w-3/4 mx-5 my-2">
                                    My Order</button></Link>
                                <Link to="/my-recharge"><button className="btn w-3/4 mx-5 my-2">
                                    My Recharge</button></Link>
                                <Link to="https://t.me/unofficial724"><button className="btn w-3/4 mx-5 my-2">
                                    টেলিগ্রাম</button></Link>
                            </>
                        }
                        {
                            authUser && authUser.role === 'admin' && <>
                                <Link to="/all-order"><button className="btn w-3/4 mx-5 my-2">
                                    All Order</button></Link>
                                <Link to="/all-recharge"><button className="btn w-3/4 mx-5 my-2">
                                    All Recharge</button></Link>
                                <Link to="/all-user"><button className="btn w-3/4 mx-5 my-2">
                                    All User</button></Link>
                                <Link to="/update-balance"><button className="btn w-3/4 mx-5 my-2">
                                    Update Balance</button></Link>
                                <Link to="/signup"><button className="btn w-3/4 mx-5 my-2">
                                    Add Account</button></Link></>
                        }

                        <p className="m-4 text-[12px]">একাউন্ট</p>
                        <Link to="/profile"><button className="btn w-3/4 mx-5 my-2">
                            প্রোফাইল</button></Link>
                        <Link to="/update-password"><button className="btn w-3/4 mx-5 my-2">
                            পাসওয়ার্ড পরিবর্তন</button></Link>
                        <button className="btn w-3/4 mx-5 my-2" onClick={() => logout()}>
                            লগ আউট</button>


                    </div>
                </div>
                <div className="w-full lg:w-10/12 md:w-10/12 min-h-screen">
                    <Notice />
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Main;