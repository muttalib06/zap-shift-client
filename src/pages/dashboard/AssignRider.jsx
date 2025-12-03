import { useQuery } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../../components/common/Spinner";
import Error from "../../components/common/Error";
import Swal from "sweetalert2";

const AssignRider = () => {
  const [selectedParcel, setSelectedParcel] = useState(null);
  const modalRef = useRef(null);
  const axiosSecure = useAxiosSecure();
  const {
    data: parcels = [],
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["parcels", "parcel paid"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?deliveryStatus=parcel paid"
      );
      return res.data;
    },
  });

  //   get riders according to the selected district;
  const { data: riders = [] } = useQuery({
    queryKey: ["riders", selectedParcel?.senderDistrict, "Available"],
    enabled: !!selectedParcel,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/riders?status=Approved&district=${selectedParcel?.senderDistrict}&workStatus=Available`
      );
      return res.data;
    },
  });

  //   assign rider;

  const handleAssignRider = (rider) => {
    const riderInfo = {
      riderId: rider._id,
      riderEmail: rider.email,
      riderName: rider.name,
      trackingId: selectedParcel.trackingId,
    };
    axiosSecure
      .patch(`/parcels/${selectedParcel._id}`, riderInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          modalRef.current.close();
          Swal.fire({
            title: "Rider has been assigned",
            icon: "success",
            draggable: true,
          });
        }
      });
  };

  //   handle modal ;

  const handleModal = (parcel) => {
    setSelectedParcel(parcel);
    modalRef.current.showModal();
  };

  console.log(riders);

  if (isLoading) {
    return <Spinner></Spinner>;
  }
  if (error) {
    return <Error></Error>;
  }
  return (
    <div className="max-w-4/5 mx-auto mt-8">
      <h1 className="text-2xl font-bold">Pending Parcel: {parcels.length}</h1>

      <div className="overflow-x-auto mt-5">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Cost</th>
              <th>Created At</th>
              <th>Pickup District</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <th>{index + 1}</th>
                <td>{parcel.parcelName}</td>
                <td>{parcel.cost}</td>
                <td>{new Date(parcel.createdAt).toLocaleString()}</td>
                <td>{parcel.senderDistrict}</td>
                <td>
                  <button
                    onClick={() => handleModal(parcel)}
                    className="btn bg-primary"
                  >
                    Find Riders
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* modal */}
      <dialog ref={modalRef} id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Available Riders: {riders.length}
          </h3>
          <div>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>District</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {riders.map((rider, index) => (
                    <tr key={rider._id}>
                      <th>{index + 1}</th>
                      <td>{rider.name}</td>
                      <td>{rider.district}</td>
                      <td>
                        <button
                          onClick={() => handleAssignRider(rider)}
                          className="btn bg-primary"
                        >
                          Assign
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AssignRider;
