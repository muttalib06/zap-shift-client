import React from "react";
import logo from "../../assets/logo.png";
import { NavLink } from "react-router";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

const Navbar = () => {
  return (
    <div className="bg-base-100 shadow-sm ">
      <div className="md:max-w-4/5 mx-auto navbar">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink>Services</NavLink>
              </li>
              <li>
                <NavLink>Coverage</NavLink>
              </li>
              <li>
                <NavLink>About Us</NavLink>
              </li>
              <li>
                <NavLink>Pricing</NavLink>
              </li>
              <li>
                <NavLink>Be a Rider</NavLink>
              </li>
              <li>
                <button className="btn">Sign In</button>
              </li>
            </ul>
          </div>
          <a className="flex items-end font-extrabold text-3xl">
            <img src={logo} alt="" />
            ZapShift
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink>Services</NavLink>
            </li>
            <li>
              <NavLink>Coverage</NavLink>
            </li>
            <li>
              <NavLink>About Us</NavLink>
            </li>
            <li>
              <NavLink>Pricing</NavLink>
            </li>
            <li>
              <NavLink>Be a Rider</NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end space-x-3">
          <button className="btn hidden lg:block">Sign In</button>
          <div className="flex">
            <button className="btn bg-primary">Be a Rider</button>
            <div className="bg-black p-3 rounded-full">
              <FiExternalLink className="text-primary"></FiExternalLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
