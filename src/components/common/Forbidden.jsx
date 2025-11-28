import React from "react";
import { NavLink } from "react-router";
import forbiddenImg from "../../assets/7938324_3814338 1.png"

const Forbidden = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-4/5 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Content */}
        <div className="flex-1 text-left">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            Ooops....
          </h1>
          <p className="text-xl text-gray-900 font-semibold mb-3">
            Page not found
          </p>
          <p className="text-gray-600 mb-8 max-w-md">
            The page you are looking is either not available or cannot be found,
            go back to home page.
          </p>
          <NavLink
            to="/"
            className="bg-lime-400 hover:bg-lime-500 text-gray-900 font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
          >
            Go Home
          </NavLink>
        </div>

        {/* Right Content - Image Placeholder */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md aspect-square bg-linear-to-br from-lime-100 to-lime-200 rounded-3xl flex flex-col items-center justify-center p-8">
            {/* Image placeholder */}
            <div className="text-center">
              <img src={forbiddenImg} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
