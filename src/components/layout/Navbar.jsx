import React from "react";
import logo from "../../assets/logo.png";
import { NavLink } from "react-router";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import useAuth from "../../hooks/useAuth";
import { toast, ToastContainer } from "react-toastify";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logout successful");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

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
                <NavLink>Home</NavLink>
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
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
              <li>
                {user ? (
                  <button onClick={handleLogOut} to="/login" className="btn">
                    Logout
                  </button>
                ) : (
                  <NavLink to="/login" className="btn">
                   Sign In
                  </NavLink>
                )}
              </li>
            </ul>
          </div>
          <div className="flex items-end font-extrabold text-3xl">
            <img src={logo} alt="" />
            <p> ZapShift</p>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/coverage">Coverage</NavLink>
            </li>
            <li>
              <NavLink to="/about">About Us</NavLink>
            </li>
            <li>
              <NavLink to="/sendParcel">Send Parcel</NavLink>
            </li>
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end space-x-3">
          {user ? (
            <button onClick={handleLogOut} to="/login" className="btn hidden lg:block">
              Logout
            </button>
          ) : (
            <NavLink to="/login" className=" px-2 py-2 btn rounded border hidden lg:block">
              Sign In
            </NavLink>
          )}
          <div className="flex">
            <NavLink to="/rider" className="btn bg-primary">Be a Rider</NavLink>
            <div className="bg-black p-3 rounded-full">
              <FiExternalLink className="text-primary"></FiExternalLink>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Navbar;
