import React from "react";
import { FiExternalLink } from "react-icons/fi";
import { NavLink } from "react-router";

const Button = () => {
  return (
    <div className="flex">
      <NavLink to="/rider" className="btn bg-primary">Be a Rider</NavLink>
      <div className="bg-black p-3 rounded-full">
        <FiExternalLink className="text-primary"></FiExternalLink>
      </div>
    </div>
  );
};

export default Button;
