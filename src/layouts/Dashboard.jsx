import React from "react";
import Logo from "../components/common/Logo";
import { BiPackage } from "react-icons/bi";
import { NavLink, Outlet } from "react-router";
import { FaBiking, FaHistory, FaTasks, FaUser, FaUsers } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { TbBikeFilled } from "react-icons/tb";
import useRole from "../hooks/useRole";

const Dashboard = () => {
  const { role } = useRole();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-300 flex justify-between items-center px-8">
          <div className="flex items-center gap-3">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Sidebar toggle icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-4"
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
            <Logo></Logo>
          </div>

          <div>
            <div className="border p-2 rounded-full">
              <NavLink to="/dashboard/profile">
                <FaUser></FaUser>
              </NavLink>
            </div>
          </div>
        </nav>
        {/* Page content here */}
        <div className="p-4">
          <Outlet></Outlet>
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {/* List item */}
            <li>
              <NavLink
                to="/"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                {/* Home icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <span className="is-drawer-close:hidden">Homepage</span>
              </NavLink>
            </li>

            {/* List item */}
            <li>
              <NavLink
                to="/dashboard/my-parcels"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="My-Parcels"
              >
                {/* my parcel */}
                <BiPackage></BiPackage>

                <span className="is-drawer-close:hidden">My Parcels</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/profile"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Profile"
              >
                {/* my parcel */}
                <CgProfile />

                <span className="is-drawer-close:hidden">Profile</span>
              </NavLink>
            </li>

            {/* only rider links */}
            {role.role === "Rider" && (
              <>
                <li>
                  <NavLink
                    to="/dashboard/assigned-delivery"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Assigned Delivery"
                  >
                    {/* my parcel */}
                    <FaTasks />

                    <span className="is-drawer-close:hidden">
                      Assigned Delivery
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/completed-delivery"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Completed Delivery"
                  >
                    {/* my parcel */}
                    <GiConfirmed />

                    <span className="is-drawer-close:hidden">
                      Completed Delivery
                    </span>
                  </NavLink>
                </li>
              </>
            )}

            {/* Only admin links */}
            {role.role === "Admin" && (
              <>
                {" "}
                <li>
                  <NavLink
                    to="/dashboard/riderApproval"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Riders Approval"
                  >
                    {/* my parcel */}
                    <FaBiking />

                    <span className="is-drawer-close:hidden">Riders</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/users"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="User Manage"
                  >
                    {/* my parcel */}
                    <FaUsers />

                    <span className="is-drawer-close:hidden">User Mange</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/assign-rider"
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Assign Rider"
                  >
                    {/* my parcel */}
                    <TbBikeFilled />

                    <span className="is-drawer-close:hidden">Assign Rider</span>
                  </NavLink>
                </li>
              </>
            )}
            <li>
              <NavLink
                to="/dashboard/payment-history"
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Payment-History"
              >
                {/* my parcel */}
                <FaHistory />

                <span className="is-drawer-close:hidden">Payment History</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
