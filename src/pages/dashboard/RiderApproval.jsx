import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../../components/common/Spinner";
import Error from "../../components/common/Error";
import { FcApproval } from "react-icons/fc";
import { CiCircleRemove } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const RiderApproval = () => {
  const axiosSecure = useAxiosSecure();

  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  const updateRiderStatus = (rider, status) => {
    const riderInfo = { status: status, email: rider.email };
    axiosSecure.patch(`/riders/${rider._id}`, riderInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          title: `Rider is ${status}`,
          icon: "success",
          draggable: true,
        });
      }
    });
  };

  const handleApproved = (rider) => {
    updateRiderStatus(rider, "Approved");
  };

  const handleRejected = (rider) => {
    updateRiderStatus(rider, "Rejected");
  };

  //   delete function;

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/riders/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
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
      <h2 className="text-2xl font-bold">Rider:{data.length}</h2>

      {/* Table */}

      <div className="overflow-x-auto mt-5">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* row  */}
            {data.map((rider, index) => (
              <tr key={rider._id}>
                <th>{index + 1}</th>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td
                  className={`${
                    rider.status === "Approved"
                      ? "text-green-500"
                      : rider.status === "Rejected"
                      ? "text-red-500"
                      : "text-yellow-500"
                  }`}
                >
                  {rider.status}
                </td>
                <td>{new Date(rider.createdAt).toLocaleString()}</td>
                <td className="space-x-2 space-y-2 lg:space-y-0">
                  <button
                    onClick={() => handleApproved(rider)}
                    className="btn square-btn"
                  >
                    <FcApproval />
                  </button>
                  <button
                    onClick={() => handleRejected(rider)}
                    className="btn square-btn"
                  >
                    <CiCircleRemove className="text-red-500" />
                  </button>
                  <button
                    onClick={() => handleDelete(rider._id)}
                    className="btn square-btn"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiderApproval;
