import { createBrowserRouter, Navigate } from "react-router-dom";
import Main from "../Main/Main";
import Role from "../../Pages/Role/Role";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import Main_Customer from "../Customer/Main";
import Index from "../../Pages/Customer/Index";
import Search from "../../Pages/Customer/Search/Search";
import All from "../../Pages/Customer/Medicines/All";
import Single from "../../Pages/Customer/Medicines/Single";
import Verify from "../../Pages/Verify/Verify";
import Information from "../../Pages/Information/Information";
import Email from "../../Pages/Email";
import Index_Rider from "../../Pages/Rider/Index";
import Index_Owner from "../../Pages/FarmacyOwner/Index";
import CheckMedi from "../../Pages/FarmacyOwner/Inventory/CheckMedi";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />
    },
    {
        path: "/customer",
        element: <Main_Customer />,
        children: [
            {
                path: "",
                element: <Index />
            },
            {
                path: "search",
                element: <Search />
            },
            {
                path: "all-medicine-view",
                element: <All />
            },
            {
                path: "single-medicine-view/:id",
                element: <Single />
            }
        ]
    },
    {
        path: "/farmacy-owner",
        element: <Index_Owner />,
        children: [
            {
                path: "check-medicine/:id",
                element: <CheckMedi />
            }
        ]
    },
    {
        path: "/rider",
        element: <Index_Rider />
    },
    {
        path: "/email",
        element: <Email />
    },
    {
        path: "/verify-customer",
        element: <Verify isCustomer />
    },
    {
        path: "/verify-rider",
        element: <Verify isRider />
    },
    {
        path: "/verify-farmacy-owner",
        element: <Verify isOwner />
    },
    {
        path: "/verify/information-customer",
        element: <Information isCustomer />
    },
    {
        path: "/verify/information-rider",
        element: <Information isRider />
    },
    {
        path: "/verify/information-farmacy-owner",
        element: <Information isOwner />
    },
    {
        path: "/login/role",
        element: <Role isLogin />
    },
    {
        path: "/register/role",
        element: <Role isRegister />
    },
    {
        path: "customer/login",
        element: <Login isCustomer />
    },
    {
        path: "customer/register",
        element: <Register isCustomer />
    },
    {
        path: "farmacy-owner/login",
        element: <Login isOwner />
    },
    {
        path: "farmacy-owner/register",
        element: <Register isOwner />
    },
    {
        path: "rider/login",
        element: <Login isRider />
    },
    {
        path: "rider/register",
        element: <Register isRider />
    },
    {
        path: "login",
        element: <Navigate to="/login/role" />
    },
    {
        path: "register",
        element: <Navigate to="/register/role" />
    },
    {
        path: "role",
        element: <Navigate to="/register/role" />
    },
    {
        path: "*",
        element: <Navigate to="/" />
    }
]);

export default router;