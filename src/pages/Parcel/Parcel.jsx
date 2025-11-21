import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

const Parcel = () => {
  const [serviceCenters, setServiceCenters] = useState([]);
  const [serviceCenterData, setServiceCenterData] = useState([]);

  const { register, handleSubmit, control } = useForm();

  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const handleSendParcel = (data) => {
    console.log("after send parcel", data);
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
                    {...register("senderName")}
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
                      <option key={index}>{r}</option>
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

                    {
                      districtByRegion(senderRegion).map((d,index) => <option key={index}>{d}</option>)
                    }
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
                      <option key={index}>{d}</option>
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
