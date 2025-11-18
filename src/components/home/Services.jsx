import React, { useEffect, useState } from "react";
import Service from "../common/Service";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch("/service.json")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);
  return (
    <div className="bg-[#03373D] flex justify-center flex-col items-center p-6 rounded-xl mx-3 lg:mx-0">
      <div className="text-center space-y-3">
        <h2 className="font-bold text-3xl">Our Services</h2>
        <p className="text-[#DADADA]">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to <br /> business shipments — we
          deliver on time, every time.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 items-stretch">
        {
                services.map((service,index) => <Service key={index} service={service}></Service>)
        }
      </div>
    </div>
  );
};

export default Services;
