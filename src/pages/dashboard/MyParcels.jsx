import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../components/common/Spinner";
import Error from "../../components/common/Error";
import useAuth from "../../hooks/useAuth";

const MyParcels = () => {
  const { user } = useAuth();
  const secureAxios = useAxiosSecure();
  const {
    isLoading,
    error,
    data: parcels = [],
  } = useQuery({
    queryKey: ["parcels"],
    queryFn: async () => {
      const response = await secureAxios.get(`/parcels?email=${user?.email}`);
      return response.data;
    },
  });


  console.log("after loading data", parcels);

  if (isLoading) {
    return <Spinner></Spinner>;
  }
  if (error) {
    return <Error></Error>;
  }
  return (
    <div className="max-w-4/5 mx-auto">
      <h1 className="font-bold text-xl">My parcels {parcels.length}</h1>

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100 mt-5">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Parcel Name</th>
              <th>Weight</th>
              <th>Cost</th>
              <th>Created Date</th>
            </tr>
          </thead>
          <tbody>
            {/* Table row */}
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.parcelType ==="document" ? "Document" : parcel.parcelWeight}</td>
                <td>{parcel.cost}</td>
                <td>{new Date(parcel.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
