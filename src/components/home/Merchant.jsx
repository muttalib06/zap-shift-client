import React from "react";
import locationImg from "../../assets/location-merchant.png"
import merchant from "../../assets/be-a-merchant-bg.png"
const Merchant = () => {
  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="relative bg-gradient-to-br from-teal-900 via-teal-800 to-cyan-700 rounded-3xl shadow-2xl overflow-hidden">
          {/* Decorative Wave Pattern */}
          <div className="absolute top-0 right-0 w-full h-full opacity-10">
           <img src={merchant} alt="" />
          </div>

          <div className="relative grid md:grid-cols-2 gap-8 items-center p-12 md:p-16">
            {/* Left Content */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Merchant and Customer Satisfaction is Our First Priority
              </h2>

              <p className="text-teal-100 text-sm leading-relaxed">
                We offer the lowest delivery charge with the highest value along
                with 100% safety of your product. Partoocourier delivers your
                parcels in every corner of Bangladesh right on time.
              </p>

              <div className="flex flex-wrap gap-4 pt-4">
                <button className="bg-primary hover:bg-primary text-gray-900 font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl">
                  Become a Merchant
                </button>

                <button className="bg-transparent hover:bg-teal-700 text-primary font-semibold px-8 py-3 rounded-full border-2 border-primary transition-all duration-300">
                  Earn with ZapShift Courier
                </button>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="relative flex items-center justify-center">
            <img src={locationImg} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Merchant;
