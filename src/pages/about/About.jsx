import React, { useEffect, useState } from "react";

const About = () => {
  const [activeTab, setActiveTab] = useState("Story");
  const [aboutData, setAboutData] = useState([]);
  const [showData, setShowData] = useState({});
  const tabs = ["Story", "Mission", "Success", "Team & Others"];

  const handleShowData = (id) => {
    const data = aboutData.find((aboutData) => aboutData.id === id);
    setShowData(data);
  };

  useEffect(() => {
    fetch("/about.json")
      .then((res) => res.json())
      .then((data) => {
        setAboutData(data);
        setShowData(data[0]);
      });
  }, []);

  return (
    <div className=" bg-gray-100 py-10 px-5">
      <section className="lg:max-w-4/5 mx-auto bg-white rounded-xl shadow-md p-12 md:p-16">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1a3a52] mb-4">
          About Us
        </h1>

        <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-10">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. <br /> From personal packages to business shipments — we
          deliver on time, every time.
        </p>

        <div className="flex gap-6 md:gap-8 mb-9 border-b border-gray-200 pb-4 overflow-x-auto">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => {
                const id = index + 1;
                handleShowData(id);
                setActiveTab(tab);
              }}
              className={`relative text-base whitespace-nowrap transition-colors duration-300 pb-1 ${
                activeTab === tab
                  ? "text-[#7a9e3e] font-semibold"
                  : "text-gray-600 hover:text-[#7a9e3e]"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute -bottom-4 left-0 w-full h-0.5 bg-[#7a9e3e]"></span>
              )}
            </button>
          ))}
        </div>

        <div className="text-gray-700 text-sm md:text-base leading-relaxed space-y-6">
          {showData?.description}
        </div>
      </section>
    </div>
  );
};

export default About;
