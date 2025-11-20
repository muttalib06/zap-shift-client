import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/common/Spinner";

const MainLayout = () => {
  const {loading} = useAuth();
  if(loading){
    return <Spinner></Spinner>
  }
  return (
    <div className="bg-[#eaeced] ">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
