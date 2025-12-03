import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import useAxios from "../../hooks/useAxios";
import Spinner from "../../components/common/Spinner";
import Error from "../../components/common/Error";
import {
  FaBiking,
  FaCheckCircle,
  FaClock,
  FaMapPin,
  FaUser,
} from "react-icons/fa";

const TrackingPage = () => {
  const { trackingId } = useParams();
  const axiosInstance = useAxios();
  const {
    data: trackings = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tracking", trackingId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/trackings/${trackingId}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  if (error) {
    return <Error></Error>;
  }

  console.log(trackings);
  return (
    <div className="max-w-4/5 mx-auto mt-8">
      <h1 className="text-2xl font-bold text-center">
        Parcel Status & Tracking
      </h1>

      <div className="min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Tracking Timeline */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">
              Tracking Status
            </h2>

            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>

              {/* Tracking parcel */}

              {trackings.map((tracking) => (
                <div key={tracking._id} className="relative mb-10">
                  <div className="flex items-start gap-6">
                    <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-green-500">
                      <FaCheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 pb-8">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {tracking.status}
                      </h3>
                      <p className="text-sm text-gray-500">
                       {new Date(tracking.createAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingPage;
