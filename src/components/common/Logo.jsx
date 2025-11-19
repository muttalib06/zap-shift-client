import React from "react";
import logo from "../../assets/logo.png";

const Logo = () => {
  return (
    <div className="flex items-end font-extrabold text-3xl">
      <img src={logo} alt="" />
      <p> ZapShift</p>
    </div>
  );
};

export default Logo;
