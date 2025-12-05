import React, { useEffect, useState } from "react";

import agentImg from "../../assets/agent-pending.png";
import { useForm, useWatch } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const Rider = () => {
  const {user} = useAuth()
  const [warehouses, setWarehouses] = useState([]);
  const [regions, setRegions] = useState([]);

  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const riderRegion = useWatch({ control, name: "region" });

  const onSubmit = (data) => {

    axiosSecure.post("/riders", data).then((res) => {
      if (res.data.insertedId) {
        reset()
        Swal.fire({
          title: "Your request has been submitted successfully",
          icon: "success",
          draggable: true,
        });
      }
    });
  };

  useEffect(() => {
    fetch("./warehouses.json")
      .then((res) => res.json())
      .then((data) => {
        const duplicateRegions = data.map((d) => d.region);
        const regions = new Set(duplicateRegions);
        setRegions([...regions]);
        setWarehouses(data);
      });
  }, []);

  const districtByRegion = (region) => {
    const regionDistricts = warehouses.filter(
      (warehouse) => warehouse.region === region
    );
    const districts = regionDistricts.map((d) => d.district);
    return districts;
  };

  useEffect(() => {
    window.scrollTo(0,0)
  },[])

  return (
    <div className="min-h-screen bg-gray-100 p-3 sm:p-5 md:p-8 lg:p-10">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-6 md:p-10 lg:p-16">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-teal-900 mb-3 sm:mb-4 md:mb-5">
          Be a Rider
        </h1>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-8 sm:mb-10 md:mb-12 max-w-2xl">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          {/* Form Section */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-teal-900 mb-6 sm:mb-8">
              Tell us about yourself
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4 sm:space-y-5">
                {/* Name and Age Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      {...register("name", { required: "Name is required" })}
                      placeholder="Your Name"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-900 focus:bg-white transition"
                    />
                    {errors.name && (
                      <p className="py-2 text-red-500">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      Yor age
                    </label>
                    <input
                      type="number"
                      {...register("age", { required: "Age is required" })}
                      placeholder="Yor age"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-900 focus:bg-white transition"
                    />
                    {errors.age && (
                      <p className="py-2 text-red-500">{errors.age.message}</p>
                    )}
                  </div>
                </div>

                {/* Email and Gender Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      {...register("email", { required: "Email is required" })}
                      defaultValue={user.email}
                       readOnly
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-900 focus:bg-white transition"
                    />
                    {errors.email && (
                      <p className="py-2 text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      Your Gender
                    </label>
                    <select
                      {...register("gender", {
                        required: "Gender is required",
                      })}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-900 focus:bg-white transition appearance-none cursor-pointer"
                    >
                      {errors.district && (
                        <p className="py-2 text-red-500">
                          {errors.district.message}
                        </p>
                      )}

                      <option>Select Your Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>

                {/* district and region */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      Your Region
                    </label>
                    <select
                      {...register("region", {
                        required: "Region is required",
                      })}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-900 focus:bg-white transition appearance-none cursor-pointer"
                    >
                      <option  value="">Select Your Region</option>
                      {regions.map((region, index) => (
                        <option key={index} value={region}>
                          {region}
                        </option>
                      ))}
                    </select>
                    {errors.region && (
                      <p className="py-2 text-red-500">
                        {errors.region.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      Your District
                    </label>
                    <select
                      {...register("district", {
                        required: "District is required",
                      })}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-900 focus:bg-white transition appearance-none cursor-pointer"
                    >
                      <option value="">Select Your District</option>
                      {districtByRegion(riderRegion).map((district, index) => (
                        <option key={index} value={district}>
                          {district}
                        </option>
                      ))}
                    </select>
                    {errors.district && (
                      <p className="py-2 text-red-500">
                        {errors.district.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* NID and Contact Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      NID No
                    </label>
                    <input
                      type="text"
                      {...register("NID", { required: "NID NO is required" })}
                      placeholder="NID"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-900 focus:bg-white transition"
                    />
                    {errors.NID && (
                      <p className="py-2 text-red-500">{errors.NID.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                      Contact
                    </label>
                    <input
                      type="text"
                      {...register("contact", {
                        required: "contact is required",
                      })}
                      placeholder="Contact"
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-900 focus:bg-white transition"
                    />
                    {errors.contact && (
                      <p className="py-2 text-red-500">
                        {errors.contact.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Wirehouse Selection */}
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                    Which wire-house you want to work?
                  </label>
                  <select
                    {...register("warehouse", {
                      required: "Warehouse is required",
                    })}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-teal-900 focus:bg-white transition appearance-none cursor-pointer"
                  >
                    {errors.warehouse && (
                      <p className="py-2 text-red-500">
                        {errors.warehouse.message}
                      </p>
                    )}
                    <option value="">Select wire-house</option>
                    <option value="central">Central Warehouse</option>
                    <option value="north">North Warehouse</option>
                    <option value="south">South Warehouse</option>
                    <option value="east">East Warehouse</option>
                    <option value="west">West Warehouse</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary text-black font-semibold py-3 sm:py-3.5 text-sm sm:text-base rounded-lg transition duration-300 mt-2 sm:mt-3"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          {/* Illustration Section */}
          <div className="flex justify-center items-center mt-8 lg:mt-0">
            <div className="relative w-full max-w-md  bg-gray-50 rounded-2xl">
              <img src={agentImg} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rider;
