import React from "react";

const Testimonial = ({ testimonial }) => {
  return (
    <div className="flex justify-center px-3 py-4 ">
      <div className="max-w-md w-full ">
        {/* Testimonial Card */}
        <div className="bg-white rounded-lg shadow-sm p-6  flex flex-col justify-between">
          {/* Quote Icon */}
          <div className="mb-4">
            <svg
              className="w-12 h-12 text-primary"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
            </svg>
          </div>

          {/* Testimonial Text */}
          <p className="text-gray-700 text-base leading-relaxed mb-4 h-35 ">
            {testimonial.testimonial}
          </p>

          {/* Divider */}
          <div className="border-t border-dashed border-gray-300 my-4"></div>

          {/* User Info */}
          <div className="flex items-center mt-auto">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-teal-700  overflow-hidden">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name and Title */}
            <div className="ml-4">
              <h3 className="text-gray-900 font-semibold text-base">
                {testimonial.name}
              </h3>
              <p className="text-gray-500 text-sm">{testimonial.title}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
