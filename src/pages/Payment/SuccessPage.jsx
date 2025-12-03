import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Spinner from "../../components/common/Spinner";

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (sessionId) {
      const handleVerifyStatus = async () => {
        try {
          const res = await axiosSecure.get(
            `/session-status?session_id=${sessionId}`
          );
          const sessionInfo = res.data;
          setSessionData(sessionInfo);
          console.log(sessionInfo)
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
      handleVerifyStatus();
    } else {
      setLoading(false);
    }
  }, [searchParams, axiosSecure]);

  if (loading) {
    return <Spinner></Spinner>;
  }
  return (
    <div>
      <div className="min-h-screen  flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg p-8">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="bg-emerald-500 rounded-full w-16 h-16 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-light text-emerald-500 text-center mb-8">
            Payment successful
          </h1>

          {/* Payment Details */}
          <div className="space-y-4 mb-8">
            {/* Payment Type */}
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">Payment type</span>
              <span className="text-gray-800 font-medium">
                {sessionData.payment_method_types[0]}
              </span>
            </div>

            {/* Bank */}
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">Currency</span>
              <span className="text-gray-800 font-medium">
                {sessionData.currency}
              </span>
            </div>

            {/* Mobile */}
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">Parcel_ID</span>
              <span className="text-gray-800 font-medium">
                {sessionData.metadata.parcelId}
              </span>
            </div>

            {/* Email */}
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">Email</span>
              <span className="text-gray-800 font-medium">
                {sessionData.customer_email}
              </span>
            </div>

            {/* Amount Paid */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <span className="text-gray-600 font-medium">Amount paid</span>
              <span className="text-gray-900 font-semibold text-lg">
                {sessionData.amount_total / 100}
              </span>
            </div>

            {/* Transaction ID */}
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">Transaction Id</span>
              <span className="text-gray-800 font-medium">
                {sessionData.payment_intent}
              </span>
            </div>
            {/*Tracking ID */}
            <div className="flex justify-between items-center">
              <span className="text-gray-500 text-sm">Tracking Id</span>
              <span className="text-gray-800 font-medium">
                {sessionData.trackingId}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate("/")}
              className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium px-8 py-3 rounded transition-colors"
            >
              Back to Home
            </button>
            <button onClick={() => navigate("/dashboard/my-parcels")} className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium px-8 py-3 rounded transition-colors">
              CLOSE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
