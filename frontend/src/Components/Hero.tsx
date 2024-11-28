import React from "react";
import banner from "../assets/banner.jpg";
import { CalendarIcon, ClockIcon } from "@heroicons/react/outline"; // Heroicons for Calendar and Clock

const Hero = ({ isBlog = true }) => {
  return (
    <div
      className="flex justify-center items-center w-full mx-auto"
      style={{
        backgroundImage: `url(${banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "70vh",
        width: "100%",
      }}
    >
      {/* Blog details */}
      <div
        className={`w-full ${
          !isBlog ? "hidden" : "flex"
        } flex-col items-center justify-center mx-auto px-6 md:px-12 lg:px-24 min-h-[70vh]`}
      >
        {/* Hero Header */}
        <div className="text-center md:text-left flex flex-col md:flex-row md:space-x-16 items-center md:items-start">
          <div className="text-orange-500 mb-6 md:mb-0">
            <h1 className="text-4xl font-bold leading-tight mb-2">
              Development Topic
            </h1>
            <h2 className="text-2xl font-semibold">Programming Languages</h2>
          </div>

          {/* Date and Time Read Section */}
          <div className="flex items-center space-x-6 text-sm text-orange-500">
            <div className="flex items-center space-x-2">
              <CalendarIcon className="w-5 h-5 text-orange-400" />
              <span>20 Nov 2024</span>
            </div>
            <div className="flex items-center space-x-2">
              <ClockIcon className="w-5 h-5 text-orange-400" />
              <span>5 min read</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar and Filters */}
      <div
        className={`w-2/3 ${
          isBlog ? "hidden" : "flex"
        } flex-col items-center gap-6 mb-4 px-6 md:px-12 lg:px-24`}
      >
        {/* Search Bar */}
        <div className="w-full">
          <input
            type="text"
            placeholder="Search Movies"
            className="h-12 w-full bg-gray-700 text-orange-500 rounded-lg shadow-md outline-none px-4 border border-gray-500 focus:border-gray-300 focus:ring-1 focus:ring-gray-500"
          />
        </div>

        {/* Options (Select Elements) */}
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <select className="h-12 w-full bg-gray-700 text-orange-500 rounded-lg shadow-md outline-none px-4 border border-gray-500 focus:border-gray-300 focus:ring-1 focus:ring-gray-500">
            <option value="">Select Category</option>
          </select>
          <select className="h-12 w-full bg-gray-700 text-orange-500 rounded-lg shadow-md outline-none px-4 border border-gray-500 focus:border-gray-300 focus:ring-1 focus:ring-gray-500">
            <option value="">Select Subcategory</option>
          </select>
          <select className="h-12 w-full bg-gray-700 text-orange-500 rounded-lg shadow-md outline-none px-4 border border-gray-500 focus:border-gray-300 focus:ring-1 focus:ring-gray-500">
            <option value="">Date Posted</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Hero;
