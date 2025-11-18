import React from "react";
import bannerImg1 from "../../assets/big-deliveryman.png";
import bannerImg2 from "../../assets/26489167_delivery_man 1.png";
import bannerImg3 from "../../assets/10256550_18149902 1.png";
import { FiExternalLink } from "react-icons/fi";
import tinyDeliveryImg from "../../assets/tiny-deliveryman.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css/pagination";
import "swiper/css";

const Banner = () => {
  return (
    <>
      <Swiper
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        speed={2500}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          {" "}
          <div className="mt-5 flex items-center justify-center p-5">
            <div className="max-w-7xl w-full bg-white rounded-3xl p-6 shadow-2xl md:p-8">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="space-y-5">
                  {/* Logo/Icon */}
                  <div>
                    <img src={tinyDeliveryImg} alt="" />
                  </div>

                  {/* Main Heading */}
                  <div className="space-y-1">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                      We Make Sure Your
                    </h1>
                    <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                      <span className="text-lime-500">Parcel Arrives</span>{" "}
                      <span className="text-gray-900">On Time</span>
                    </h1>
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                      – No Fuss.
                    </h1>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
                    Enjoy fast, reliable parcel delivery with real-time tracking
                    and zero hassle. From personal packages to business
                    shipments — we deliver on time, every time.
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap gap-4 items-center">
                    <div className="flex">
                      <button className="bg-primary  text-gray-900 font-semibold px-8 py-4 rounded-full flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                        Track Your Parcel
                      </button>

                      <div className="bg-black p-5 rounded-full">
                        <FiExternalLink className="text-primary"></FiExternalLink>
                      </div>
                    </div>

                    <button className="bg-white hover:bg-gray-50 text-gray-900 font-semibold px-8 py-4 rounded-full border-2 border-gray-200 transition-all duration-300">
                      Be A Rider
                    </button>
                  </div>

                  {/* Progress Dots */}
                </div>

                {/* Right Illustration */}
                <div>
                  <img src={bannerImg1} alt="Delivery Driver" />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div className="mt-5 flex items-center justify-center p-5">
            <div className="max-w-7xl w-full bg-white rounded-3xl p-6 shadow-2xl md:p-8">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="space-y-5">
                  {/* Logo/Icon */}
                  <div>
                    <img src={tinyDeliveryImg} alt="" />
                  </div>

                  {/* Main Heading */}
                  <div className="space-y-1">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                      Fastest
                    </h1>
                    <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                      <span className="text-lime-500"> Delivery </span>{" "}
                      <span className="text-gray-900">& Easy</span>
                    </h1>
                    <h1 className="text-3xl md:text-5xl font-bold text-lime-500 leading-tight">
                      Pickup
                    </h1>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
                    Enjoy fast, reliable parcel delivery with real-time tracking
                    and zero hassle. From personal packages to business
                    shipments — we deliver on time, every time.
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap gap-4 items-center">
                    <div className="flex">
                      <button className="bg-primary  text-gray-900 font-semibold px-8 py-4 rounded-full flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                        Track Your Parcel
                      </button>

                      <div className="bg-black p-5 rounded-full">
                        <FiExternalLink className="text-primary"></FiExternalLink>
                      </div>
                    </div>

                    <button className="bg-white hover:bg-gray-50 text-gray-900 font-semibold px-8 py-4 rounded-full border-2 border-gray-200 transition-all duration-300">
                      Be A Rider
                    </button>
                  </div>

                  {/* Progress Dots */}
                </div>

                {/* Right Illustration */}
                <div>
                  <img src={bannerImg2} alt="Delivery Driver" />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div className="mt-5 flex items-center justify-center p-5">
            <div className="max-w-7xl w-full bg-white rounded-3xl p-6 shadow-2xl md:p-8">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="space-y-5">
                  {/* Logo/Icon */}
                  <div>
                    <img src={tinyDeliveryImg} alt="" />
                  </div>

                  {/* Main Heading */}
                  <div className="space-y-1">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                      Delivery in
                    </h1>
                    <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                      <span className="text-lime-500">30 Minutes</span>{" "}
                      <span className="text-gray-900">at your doorstep</span>
                    </h1>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
                    Enjoy fast, reliable parcel delivery with real-time tracking
                    and zero hassle. From personal packages to business
                    shipments — we deliver on time, every time.
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap gap-4 items-center">
                    <div className="flex">
                      <button className="bg-primary  text-gray-900 font-semibold px-8 py-4 rounded-full flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                        Track Your Parcel
                      </button>

                      <div className="bg-black p-5 rounded-full">
                        <FiExternalLink className="text-primary"></FiExternalLink>
                      </div>
                    </div>

                    <button className="bg-white hover:bg-gray-50 text-gray-900 font-semibold px-8 py-4 rounded-full border-2 border-gray-200 transition-all duration-300">
                      Be A Rider
                    </button>
                  </div>

                  {/* Progress Dots */}
                </div>

                {/* Right Illustration */}
                <div>
                  <img src={bannerImg3} alt="Delivery Driver" />
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;
