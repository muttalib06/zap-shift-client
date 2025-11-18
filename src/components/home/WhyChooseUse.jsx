import React, { useEffect, useState } from "react";
import saveDelivery from "../../assets/safe-delivery.png";

const WhyChooseUse = () => {
  const [delivery, setDelivery] = useState([]);

  useEffect(() => {
    fetch("/delivery.json")
      .then((res) => res.json())
      .then((data) => setDelivery(data));
  }, []);
  return (
    <div className="space-y-3">
      {delivery.map((data) => (
        <div key={data.id}>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden p-3">
              <div className="flex">
                {/* Image Space */}
                <div>
                  <img src={saveDelivery} alt="" />
                </div>

                {/* Content Side */}
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                   {data.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                 {data.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WhyChooseUse;
