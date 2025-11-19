import React, { useEffect, useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

const FAQ = () => {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    fetch("/faq.json")
      .then((res) => res.json())
      .then((data) => setFaqs(data));
  }, []);
  return (
    <div className="mt-15 max-w-4/5 mx-auto">
      <div className="space-y-2">
        <h2 className="font-bold text-3xl text-tertiary text-center">
          Frequently Asked Question (FAQ)
        </h2>
        <p className="text-tertiary text-center">
          Enhance posture, mobility, and well-being effortlessly with Posture
          Pro. Achieve proper alignment, reduce pain, <br /> and strengthen your
          body with ease!
        </p>
      </div>

      <div className="space-y-4 my-8">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`rounded-lg border transition-all duration-200 ${
              openIndex === index
                ? "border-[#C3DFE2] bg-[#C3DFE2]  shadow-sm"
                : "border-gray-200 bg-white"
            }`}
          >
            <button
              onClick={() => setOpenIndex(index)}
              className="w-full px-6 py-4 flex items-center justify-between text-left  transition-colors rounded-lg"
            >
              <span className="font-medium text-gray-900 text-sm pr-4">
                {faq.question}
              </span>

              {openIndex === index ? (
                <BiChevronUp className="w-5 h-5 text-gray-600 flex-shrink-0"></BiChevronUp>
              ) : (
                <BiChevronDown className="w-5 h-5 text-gray-600 flex-shrink-0"></BiChevronDown>
              )}
            </button>

            {openIndex === index && (
              <div className="px-6 pb-4">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
