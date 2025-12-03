import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../../components/common/Spinner";
import Error from "../../components/common/Error";

const CompletedDelivery = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: parcels = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["parcels", user.email, "delivery confirm"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/assigned-parcel?email=${user.email}&deliveryStatus=delivery confirm`
      );
      return res.data;
    },
  });

  //   payout function;
  const handlePayout = (parcel) => {
    if (parcel.senderDistrict === parcel.receiverDistrict) {
      return parcel.cost * 0.6;
    }

    if (parcel.senderDistrict !== parcel.receiverDistrict) {
      return parcel.cost * 0.8;
    }
  };

  if (isLoading) {
    return <Spinner></Spinner>;
  }
  if (error) {
    return <Error></Error>;
  }
  return (
    <div className="max-w-4/5 mx-auto mt-8">
      <h2 className="text-2xl font-bold">
        Completed Delivery:{parcels.length}
      </h2>

      <div className="overflow-x-auto mt-5">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Parcel Name</th>
              <th>Cost</th>
              <th>Payout</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>${parcel.cost}</td>
                <td>${handlePayout(parcel)}</td>
                <td>
                  <button className="btn bg-primary">Payout</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompletedDelivery;
