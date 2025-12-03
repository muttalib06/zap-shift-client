import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../components/common/Spinner";
import Error from "../../components/common/Error";
import useAuth from "../../hooks/useAuth";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { NavLink } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const secureAxios = useAxiosSecure();

  const {
    isLoading,
    error,
    data: parcels = [],
    refetch,
  } = useQuery({
    queryKey: ["parcels", user?.email],
    queryFn: async () => {
      const response = await secureAxios.get(`/parcels?email=${user?.email}`);
      return response.data;
    },
  });

  // payment function
  const handlePayment = async (parcel) => {
    try {
      const parcelInfo = {
        cost: parcel.cost,
        email: parcel.senderEmail,
        parcelId: parcel._id,
        name: parcel.parcelName,
        trackingId: parcel.trackingId,
      };
      const res = await secureAxios.post(
        "/create-checkout-session",
        parcelInfo
      );
      window.location.replace(res.data.url);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };

  // delete function

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
        secureAxios.delete(`/parcels/${id}`).then((res) => {
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
    <div className="max-w-11/12 mx-auto mt-8">
      <h1 className="font-bold text-xl">My parcels {parcels.length}</h1>

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-5">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Parcel Name</th>
              <th>Weight(kg)</th>
              <th>Cost</th>
              <th>Sender District</th>
              <th>Created Date</th>
              <th>Payment</th>
              <th>Delivery Status</th>
              <th>Tracking-Id</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Table row */}
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>
                  {parcel.parcelType === "document"
                    ? "Document"
                    : parcel.parcelWeight}
                </td>
                <td>${parcel.cost}</td>
                <td>{parcel.senderDistrict}</td>
                <td>{new Date(parcel.createdAt).toLocaleString()}</td>

                <td>
                  {parcel.paymentStatus === "paid" ? (
                    <p className="text-green-400">Paid</p>
                  ) : (
                    <button
                      onClick={() => handlePayment(parcel)}
                      className="btn btn-square bg-primary"
                    >
                      Pay
                    </button>
                  )}
                </td>
                <td>{parcel.deliveryStatus}</td>
                <td>
                  <NavLink
                    to={`/tracking-page/${parcel.trackingId}`}
                    className="underline text-blue-500"
                  >
                    {parcel.trackingId}
                  </NavLink>
                </td>
                <td className="space-x-2">
                  <button className="btn btn-square hover:bg-primary">
                    <FiEdit></FiEdit>
                  </button>
                  <button
                    onClick={() => handleDelete(parcel._id)}
                    className="btn btn-square hover:bg-primary"
                  >
                    <MdDelete></MdDelete>
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

export default MyParcels;
