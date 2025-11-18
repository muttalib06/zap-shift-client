import React, { useEffect, useState } from "react";
import Banner from "../../components/home/Banner";
import Work from "../../components/home/Work";
import Services from "../../components/home/Services";
import SalesCompany from "../../components/home/SalesCompany";

const Home = () => {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    fetch("/work.json")
      .then((res) => res.json())
      .then((data) => setWorks(data));
  }, []);
  return (
    <div>
      <Banner></Banner>
      {/* Works */}
      <div className="mt-8 py-6 px-3 lg:px-0 lg:max-w-4/5 mx-auto">
        <h2 className="font-bold text-3xl text-tertiary">How it Works</h2>
        <div className="grid grid-cols-1 md:lg:grid-cols-2 xl:grid-cols-4 gap-3 mt-4 items-stretch">
          {works.map((work, index) => (
            <Work key={index} work={work}></Work>
          ))}
        </div>
      </div>

      <div className="mt-8 py-6 lg:max-w-4/5 mx-auto text-white">
        <Services></Services>
      </div>

      {/* team */}
      <div className="mt-8 py-6 px-3 lg:px-0 lg:max-w-4/5 mx-auto">
        <h2 className="font-bold text-3xl text-tertiary text-center">
          We have helped thousands of sales team
        </h2>
        <SalesCompany></SalesCompany>
      </div>
    </div>
  );
};

export default Home;
