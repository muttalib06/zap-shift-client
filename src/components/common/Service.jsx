import React from "react";
import { FiZap } from "react-icons/fi";

const Service = ({service}) => {
  return (
    <div className="flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-lg p-8 max-w-sm w-full h-full">
        {/* Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center">
            <FiZap className="w-10 h-10 text-pink-400 fill-pink-400" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 text-center mb-4">
      {service.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm text-center leading-relaxed">
         {service.description}
        </p>
      </div>
    </div>
  );
};

export default Service;
