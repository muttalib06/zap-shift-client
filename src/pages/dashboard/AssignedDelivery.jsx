import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../../components/common/Spinner";
import Error from "../../components/common/Error";
import Swal from "sweetalert2";

const AssignedDelivery = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: parcels = [],
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["parcels", user.email, "delivery assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/assigned-parcel?email=${user.email}&deliveryStatus=delivery assigned`
      );
      return res.data;
    },
  });

  //   accept parcel delivery task;
  const handleDeliveryUpdate = (parcel, deliveryStatus) => {
    const deliveryInfo = {
      deliveryStatus: deliveryStatus,
      riderEmail: user.email,
      trackingId: parcel.trackingId,
    };
    axiosSecure
      .patch(`/parcel/${parcel._id}/status`, deliveryInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            title: `${
              deliveryStatus === "rider arriving"
                ? "Thank you for accepting"
                : deliveryStatus === "delivery pickup"
                ? "Delivery pickup successfully"
                : "Delivery confirm successfully"
            }`,
            icon: "success",
            draggable: true,
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
      <h1 className="text-2xl font-bold">
        Assigned Delivery: {parcels.length}
      </h1>

      <div className="overflow-x-auto mt-5">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Parcel Name</th>
              <th>Cost</th>
              <th>Rider Email</th>
              <th>Confirm</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>$ {parcel.cost}</td>
                <td>{parcel.riderEmail}</td>
                <td className="space-x-2 space-y-2 md:space-y-0">
                  {parcel.deliveryStatus === "delivery assigned" ? (
                    <>
                      <button
                        onClick={() =>
                          handleDeliveryUpdate(parcel, "rider arriving")
                        }
                        className="btn bg-primary"
                      >
                        Accept
                      </button>
                      <button className="btn bg-amber-500">Reject</button>
                    </>
                  ) : (
                    <span>Accepted</span>
                  )}
                </td>
                <td className="space-y-2 sm:space-y-0 sm:space-x-2">
                  <div className="flex flex-col sm:flex-row gap-2">
                    {parcel.deliveryStatus === "delivery pickup" ? (
                      <button
                        onClick={() =>
                          handleDeliveryUpdate(parcel, "delivery confirm")
                        }
                        className="btn bg-primary w-full sm:w-auto"
                      >
                        Delivery Confirm
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleDeliveryUpdate(parcel, "delivery pickup")
                        }
                        className="btn bg-primary w-full sm:w-auto"
                      >
                        Mark as Pickup
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedDelivery;
