import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";

export const router = createBrowserRouter([
        {
                path:"/",
                element:<MainLayout></MainLayout>,
                children:[
                        {
                          index:true,
                          element:<Home></Home>      
                        }
                ]
        },

        {
                path:"/",
                element:<AuthLayout></AuthLayout>,
                children:[
                        {
                                path:"login",
                                element:<Login></Login>
                        },
                        {
                                path:"register",
                                element:<Register></Register>
                        }
                ]
        }
])