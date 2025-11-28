import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../../components/common/Spinner";
import Error from "../../components/common/Error";
import { MdAdminPanelSettings } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import Swal from "sweetalert2";

const Users = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: users = [],
    refetch,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
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
