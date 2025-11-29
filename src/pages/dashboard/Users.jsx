import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../../components/common/Spinner";
import Error from "../../components/common/Error";
import { MdAdminPanelSettings } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import Swal from "sweetalert2";

const Users = () => {
  const [searchText, setSearchText] = useState("");
  const axiosSecure = useAxiosSecure();
  const {
    data: users = [],
    refetch,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?searchText=${searchText}`);
      return res.data;
    },
  });

  const handleAdminRole = (id) => {
    const userInfo = { role: "Admin" };
    axiosSecure.patch(`/users/${id}`, userInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          title: "Admin Assigned Successfully!",
          icon: "success",
          draggable: true,
        });
      }
    });
  };

  const handleUserRole = (id) => {
    const userInfo = { role: "User" };

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${id}`, userInfo).then((res) => {
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
              title: "User Assigned Successfully!",
              icon: "success",
            });
          }
        });
      }
    });
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  }
  if (error) {
    return <Error></Error>;
  }

  return (
    <div className="max-w-4/5 mx-auto mt-8">
      <h2 className="text-2xl font-bold">User:{users.length}</h2>


      <label className="input my-3">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input
          onChange={(e) => {
            refetch()
            setSearchText(e.target.value)
          }}
          type="search"
          required
          placeholder="Search"
        />
      </label>

      <div className="overflow-x-auto mt-5">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created At</th>
              <th>Admin Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user.photoURL}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.displayName}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
                <td>
                  {user.role === "Admin" ? (
                    <button
                      onClick={() => handleUserRole(user._id)}
                      className="btn square-btn text-red-500"
                    >
                      <RiAdminFill />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAdminRole(user._id)}
                      className="btn -square-btn text-green-500"
                    >
                      <MdAdminPanelSettings />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
