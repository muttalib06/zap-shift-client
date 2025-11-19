import React from "react";
import { FiExternalLink } from "react-icons/fi";

const Button = () => {
  return (
    <div className="flex">
      <button className="btn bg-primary">Be a Rider</button>
      <div className="bg-black p-3 rounded-full">
        <FiExternalLink className="text-primary"></FiExternalLink>
      </div>
    </div>
  );
};

export default Button;
