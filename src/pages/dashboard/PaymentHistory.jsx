import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Spinner from "../../components/common/Spinner";

const PaymentHistory = () => {
  const { user } = useAuth();
  const [paymentData, setPaymentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const res = await axiosSecure.get(`/payments?email=${user.email}`);
        const data = res.data;
        console.log(data);
        setPaymentData(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPaymentData();
  }, [axiosSecure, user.email]);

  console.log(paymentData);

  if (loading) {
    return <Spinner></Spinner>;
  }
  return (
    <div className="max-w-4/5 mx-auto mt-8">
      <h1 className="font-bold text-xl">
        Payment History {paymentData.length}
      </h1>
      <div className="overflow-x-auto mt-5">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Email</th>
              <th>Transaction-Id</th>
              <th>Parcel-Id</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {paymentData.map((payment, index) => (
              <tr key={payment._id}>
                <th>{index + 1}</th>
                <td>{payment.email}</td>
                <td>{payment.transactionId}</td>
                <td>{payment.parcelId}</td>
                <td>
                  {new Date(payment.date).toLocaleString("en-US", {
                    timeZone: "Asia/Dhaka",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
