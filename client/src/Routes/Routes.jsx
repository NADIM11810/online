import {
    createBrowserRouter,
  } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";
import PrivateRoute from "./PrivateRoutes";
import Pdf from "../Pages/Pdf/Pdf";
import Home from "../Pages/Home/Home";
import Main from "../Layout/Main";
import ServerCopy from "../Pages/ServerCopy/ServerCopy";
import ServerCopyPrint from "../Pages/ServerCopyPrint/ServerCopyPrint";
import Recharge from "../Pages/Recharge/Recharge";
import NidOrder from "../Pages/NidOrder/NidOrder";
import AllOrder from "../Pages/AllOrder/AllOrder";
import MyOrder from "../Pages/MyOrder/MyOrder";
import AllRecharge from "../Pages/AllRecharge/AllRecharge";
import MyRecharge from "../Pages/MyRecharge/MyRecharge";
import UpdatePassword from "../Pages/UpdatePassword/UpdatePassword";
import MyProfile from "../Pages/MyProfile/MyProfile";
import NoticeForm from "../Pages/NoticeForm/NoticeForm";
import AdminRoutes from "./AdminRoutes";
import AllUser from "../Pages/AllUser/AllUser";
import BalanceForm from "../Pages/BalanceForm/BalanceForm";
import ServerCopyV2 from "../Pages/ServerCopyV2/ServerCopyV2";


 export const router = createBrowserRouter([
    {
      path: "/",
      element: <PrivateRoute><Main/></PrivateRoute>,
      children: [
        {
          path: "/",
          element:<Home/>  , 
        },
        {
          path: "/signup",
          element:<Signup/>,
        },
        {
          path: "/pdf",
          element:<Pdf/> ,
        },
        {
          path: "/home",
          element:<Home/>,
        },
        {
          path: "/server-copy",
          element:<ServerCopy/>,
        },
        {
          path: "/server-copy-print/:nid/:dob",
          element:<ServerCopyPrint/>, 
        },
        {
          path: "/recharge",
          element:<Recharge/>,
        },
        {
          path: "/nid-order",
          element:<NidOrder/>, 
        },
        {
          path: "/all-order",
          element:<AdminRoutes><AllOrder/></AdminRoutes>,
        },
        {
          path: "/my-order",
          element:<MyOrder/> , 
        },
        {
          path: "/all-recharge",
          element:<AdminRoutes><AllRecharge/></AdminRoutes> , 
        },
        {
          path: "/my-recharge",
          element:<MyRecharge/> , 
        },
        {
          path: "/update-password",
          element:<UpdatePassword/> , 
        },
        {
          path: "/profile",
          element:<MyProfile/> , 
        },
        {
          path: "/notice",
          element:<AdminRoutes><NoticeForm/></AdminRoutes> , 
        },
        {
          path: "/all-user",
          element:<AdminRoutes><AllUser/></AdminRoutes> , 
        },
        {
          path: "/update-balance",
          element:<AdminRoutes><BalanceForm/>  </AdminRoutes> , 
        },
        {
          path: "/server-copy-v2/:nid/:dob",
          element:<ServerCopyV2/> , 
        },
        
      ],
    },
    {
      path: "/login",
      element:<Login/>,
    },

    
  ]);
  