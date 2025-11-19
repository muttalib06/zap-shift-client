import React from "react";
import Logo from "../components/common/Logo";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="max-w-4/5 mx-auto mt-4 h-screen">
      <div>
        <Logo></Logo>
      </div>
      <div className="mt-8">
          <Outlet></Outlet>
      </div>
    </div>
  );
};

export default AuthLayout;
