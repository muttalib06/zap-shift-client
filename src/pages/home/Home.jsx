import React, { useEffect, useState } from "react";
import Banner from "../../components/home/Banner";
import Work from "../../components/home/Work";
import Services from "../../components/home/Services";
import SalesCompany from "../../components/home/SalesCompany";
import WhyChooseUse from "../../components/home/WhyChooseUse";
import Merchant from "../../components/home/Merchant";
import Testimonial from "../../components/home/Testimonial";
import Slider from "react-slick";
import FAQ from "../../components/home/FAQ";

const Home = () => {
  const [works, setWorks] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const workRes = await fetch("/work.json");
        const testimonialRes = await fetch("/testimonial.json");
        const workData = await workRes.json();
        const testimonialData = await testimonialRes.json();
        setWorks(workData);
        setTestimonials(testimonialData);
      } catch (error) {
        console.log(error);
      }
    };
    loadData();
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
      <div className="border-b-2 my-5 max-w-4/5 mx-auto border-dotted "></div>
      {/* why choose us */}
      <div className="mt-8 mx-4 lg:mx-0">
        <WhyChooseUse></WhyChooseUse>
      </div>

      <div className="border-b-2 my-5 max-w-4/5 mx-auto border-dotted "></div>

      {/* merchant section */}
      <Merchant></Merchant>

      {/* testimonial */}

      <div>
        <div className="space-y-2">
          <h2 className="font-bold text-3xl text-tertiary text-center">
            What our customers are sayings
          </h2>
          <p className="text-tertiary text-center">
            Enhance posture, mobility, and well-being effortlessly with Posture
            Pro. Achieve proper alignment, reduce pain, <br /> and strengthen
            your body with ease!
          </p>
        </div>
        <div className="mt-3 max-w-4/5 mx-auto">
          <Slider {...settings}>
            {testimonials.map((testimonial) => (
              <Testimonial
                key={testimonial.id}
                testimonial={testimonial}
              ></Testimonial>
            ))}
          </Slider>
        </div>
      </div>

      {/* FAQ */}

      <FAQ></FAQ>
    </div>
  );
};

export default Home;
