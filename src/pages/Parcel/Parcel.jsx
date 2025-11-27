import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router";

const Parcel = () => {
  const { user } = useAuth();
  const [serviceCenters, setServiceCenters] = useState([]);
  const [serviceCenterData, setServiceCenterData] = useState([]);
  const secureAxios = useAxiosSecure();

  const { register, handleSubmit, control } = useForm();

  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const navigate = useNavigate();

  const handleSendParcel = (data) => {
    const sameDistrict = data.senderDistrict === data.receiverDistrict;
    const isDocument = data.parcelType === "document";

    let cost = 0;
    if (isDocument) {
      cost = sameDistrict ? 60 : 80;
    } else {
      if (data.parcelWeight <= 3) {
        cost = sameDistrict ? 110 : 150;
      } else {
        const minCharge = sameDistrict ? 110 : 150;
        const extraWeight = data.parcelWeight - 3;
        const extraCharge = sameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;
        cost = minCharge + extraCharge;
      }
    }
    data.cost = cost;
    data.createdAt = new Date();
    Swal.fire({
      title: "Are your agree?",
      text: `Your total charge is ${cost} taka`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Agree",
    }).then((result) => {
      if (result.isConfirmed) {
        secureAxios.post("/parcels", data).then((res) => console.log(res.data));
        navigate("/dashboard/my-parcels")
        Swal.fire({
          title: "Booked",
          text: "Your parcel has been booked",
          icon: "success",
        });
      }
    });
  };
  useEffect(() => {
    fetch("/warehouses.json")
      .then((res) => res.json())
      .then((data) => {
        const regionsDuplicate = data.map(
          (serviceCenter) => serviceCenter.region
        );
        const regions = new Set(regionsDuplicate);
        setServiceCenters([...regions]);
        setServiceCenterData(data);
      });
  }, []);
  console.log(serviceCenters);

  const districtByRegion = (region) => {
    const regionDistricts = serviceCenterData.filter(
      (c) => c.region === region
    );
    const districts = regionDistricts.map((d) => d.district);
    console.log(districts);
    return districts;
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8">
      <div className="bg-white rounded-lg shadow-lg lg:max-w-4/5 w-full p-4 sm:p-6 md:p-8 lg:p-12">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a3a52] mb-2">
          Send A Parcel
        </h1>
        <p className="text-gray-600 text-base sm:text-lg mb-6 sm:mb-8">
          Enter your parcel details
        </p>

        {/* Document Type Selection */}
        <form onSubmit={handleSubmit(handleSendParcel)}>
          <div className="flex flex-col xs:flex-row gap-4 xs:gap-6 mb-6 sm:mb-8">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                {...register("parcelType")}
                value="document"
                defaultChecked
                className="w-4 h-4 sm:w-5 sm:h-5 text-green-500"
              />
              <span className="text-gray-700 font-medium text-sm sm:text-base">
                Document
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                {...register("parcelType")}
                value="nonDocument"
                className="w-4 h-4 sm:w-5 sm:h-5 text-primary"
              />
              <span className="text-gray-700 font-medium text-sm sm:text-base">
                Non-Document
              </span>
            </label>
          </div>

          {/* Parcel Name and Weight */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                Parcel Name
              </label>
              <input
                type="text"
                placeholder="Parcel Name"
                {...register("parcelName")}
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                Parcel Weight (KG)
              </label>
              <input
                type="text"
                {...register("parcelWeight")}
                placeholder="Parcel Weight (KG)"
                className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Sender and Receiver Details Container */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Sender Details */}
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#1a3a52] mb-4 sm:mb-6">
                Sender Details
              </h2>

              <div className="space-y-4 sm:space-y-5">
                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                    Sender Name
                  </label>
                  <input
                    type="text"
                    placeholder="Sender Name"
                    defaultValue={user.displayName}
                    {...register("senderName")}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                    Sender Email
                  </label>
                  <input
                    type="email"
                    placeholder="Sender Email"
                    defaultValue={user.email}
                    {...register("senderEmail")}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                    Address
                  </label>
                  <input
                    type="text"
                    {...register("senderAddress")}
                    placeholder="Address"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                    Sender Phone No
                  </label>
                  <input
                    type="text"
                    {...register("senderPhone")}
                    placeholder="Sender Phone No"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                    Your Region
                  </label>
                  <select
                    type="text"
                    placeholder="Region"
                    {...register("senderRegion")}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option>Select your region</option>
                    {serviceCenters.map((r, index) => (
                      <option key={index} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                    Your District
                  </label>
                  <select
                    {...register("senderDistrict")}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-500"
                  >
                    <option>Select your District</option>

                    {districtByRegion(senderRegion).map((d, index) => (
                      <option key={index} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                    Pickup Instruction
                  </label>
                  <textarea
                    placeholder="Pickup Instruction"
                    {...register("pickupInstruction")}
                    rows="4"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Receiver Details */}
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#1a3a52] mb-4 sm:mb-6">
                Receiver Details
              </h2>

              <div className="space-y-4 sm:space-y-5">
                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                    Receiver Name
                  </label>
                  <input
                    type="text"
                    placeholder="Receiver Name"
                    {...register("receiverName")}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                    Receiver Address
                  </label>
                  <input
                    type="text"
                    placeholder="Address"
                    {...register("receiverAddress")}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                    Receiver Contact No
                  </label>
                  <input
                    type="text"
                    placeholder="Receiver Contact No"
                    {...register("receiverPhone")}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                    Receiver Region
                  </label>
                  <select
                    type="text"
                    placeholder="Region"
                    {...register("receiverRegion")}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option>Receiver region</option>
                    {serviceCenters.map((r, index) => (
                      <option key={index}>{r}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                    Receiver District
                  </label>
                  <select
                    {...register("receiverDistrict")}
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-500"
                  >
                    <option>Receiver District</option>

                    {districtByRegion(receiverRegion).map((d, index) => (
                      <option key={index} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm sm:text-base">
                    Delivery Instruction
                  </label>
                  <textarea
                    placeholder="Delivery Instruction"
                    {...register("deliveryInstruction")}
                    rows="4"
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Note and Button */}
          <div className="mt-8">
            <p className="text-sm text-gray-600 mb-4">
              * PickUp Time 4pm-7pm Approx.
            </p>
            <button
              type="submit"
              className="bg-[#a8c757] hover:bg-[#96b548] text-white font-semibold px-8 py-3 rounded-md transition-colors duration-300"
            >
              Proceed to Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Parcel;
