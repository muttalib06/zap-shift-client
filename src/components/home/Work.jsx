import React from "react";
import { BiMapPin } from "react-icons/bi";
import { BsTruck } from "react-icons/bs";
import truck from "../../assets/bookingIcon.png"

const Work = ({work}) => {
  return (
    <div className="flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-lg p-8 w-full h-full">
        {/* Icon */}
        <div className="mb-6">
          <div className="relative w-16 h-16">
          <img src={truck} alt="" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
        {work.title}
        </h3>

        {/* Description */}
        <p className="text-gray-500 leading-relaxed">
        {work.description}
        </p>
      </div>
    </div>
  );
};

export default Work;
