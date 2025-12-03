import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import AuthLayout from "../layouts/AuthLayout";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import Rider from "../pages/rider/Rider";
import PrivateRoute from "./PrivateRoute";
import Coverage from "../pages/coverage/Coverage";
import About from "../pages/about/About";
import Parcel from "../pages/Parcel/Parcel";
import Dashboard from "../layouts/Dashboard";
import MyParcels from "../pages/dashboard/MyParcels";
import SuccessPage from "../pages/Payment/SuccessPage";
import PaymentHistory from "../pages/dashboard/PaymentHistory";
import RiderApproval from "../pages/dashboard/RiderApproval";
import Profile from "../pages/dashboard/Profile";
import Users from "../pages/dashboard/Users";
import PrivateAdminRoute from "./PrivateAdminRoute";
import AssignRider from "../pages/dashboard/AssignRider";
import PrivateRiderRoute from "./PrivateRiderRoute";
import AssignedDelivery from "../pages/dashboard/AssignedDelivery";
import CompletedDelivery from "../pages/dashboard/CompletedDelivery";
import TrackingPage from "../pages/Tracking/TrackingPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },

      {
        path: "rider",
        element: (
          <PrivateRoute>
            <Rider></Rider>
          </PrivateRoute>
        ),
      },
      {
        path: "coverage",
        element: (
          <PrivateRoute>
            <Coverage></Coverage>
          </PrivateRoute>
        ),
      },
      {
        path: "about",
        element: <About></About>,
      },
      {
        path: "sendParcel",
        element: <Parcel></Parcel>,
      },
      {
        path: "tracking-page/:trackingId",
        element: <TrackingPage></TrackingPage>,
      },
    ],
  },

  {
    path: "/",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },

  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Profile></Profile>,
      },
      {
        path: "/dashboard/my-parcels",
        element: <MyParcels></MyParcels>,
      },
      {
        path: "success",
        element: <SuccessPage></SuccessPage>,
      },
      {
        path: "payment-history",
        element: <PaymentHistory></PaymentHistory>,
      },
      {
        path: "riderApproval",
        element: (
          <PrivateAdminRoute>
            <RiderApproval></RiderApproval>,
          </PrivateAdminRoute>
        ),
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "users",
        element: (
          <PrivateAdminRoute>
            <Users></Users>
          </PrivateAdminRoute>
        ),
      },
      {
        path: "assign-rider",
        element: (
          <PrivateAdminRoute>
            <AssignRider></AssignRider>
          </PrivateAdminRoute>
        ),
      },
      {
        path: "assigned-delivery",
        element: (
          <PrivateRiderRoute>
            <AssignedDelivery></AssignedDelivery>
          </PrivateRiderRoute>
        ),
      },
      {
        path: "completed-delivery",
        element: (
          <PrivateRiderRoute>
            <CompletedDelivery></CompletedDelivery>
          </PrivateRiderRoute>
        ),
      },
    ],
  },
]);
