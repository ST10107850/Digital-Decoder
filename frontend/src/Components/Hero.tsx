import React, { useState, useEffect } from "react";
import banner from "../assets/banner.jpg";
import { CalendarIcon, ClockIcon } from "@heroicons/react/outline";

interface HeroProps {
  isBlog?: boolean;
  className?: string;
  onFilterChange: (filters: {
    search: string;
    category: string;
    subcategory: string;
    date: string;
  }) => void;
}

const Hero: React.FC<HeroProps> = ({
  isBlog = true,
  className,
  onFilterChange,
}) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [date, setDate] = useState("");
  const [categories, setCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/category");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/subcategory");
        if (!response.ok) {
          throw new Error("Failed to fetch subcategories");
        }
        const data = await response.json();
        setSubcategories(data.data);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchSubcategories();
  }, [category]);

  useEffect(() => {
    onFilterChange({ search, category, subcategory, date });
  }, [search, category, subcategory, date, onFilterChange]);

  return (
    <div
      className={`flex justify-center items-center w-full mx-auto ${className}`}
      style={{
        backgroundImage: `url(${banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "70vh",
        width: "100%",
      }}
    >
      <div
        className={`w-full ${
          !isBlog ? "hidden" : "flex"
        } flex-col items-center justify-center mx-auto px-6 md:px-12 lg:px-24 min-h-[70vh]`}
      >
        <div className="text-center w-[95vw] pt-[50vh] md:text-left flex flex-col md:flex-row md:space-x-16 items-center md:items-start">
          <div className="text-white mb-6 md:mb-0">
            <h1 className="text-4xl font-bold leading-tight mb-2">
              Development Topic
            </h1>
            <h2 className="text-2xl font-semibold">Programming Languages</h2>
          </div>

          <div className="flex items-center space-x-6 text-sm text-white">
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
      <div
        className={`w-2/3 ${
          isBlog ? "hidden" : "flex"
        } flex-col items-center gap-6 mb-4 px-6 md:px-12 lg:px-24`}
      >
        <div className="w-full">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Blogs"
            className="h-12 w-full bg-white text-[#b0764d] rounded-lg shadow-md outline-none px-4 border border-gray-500 focus:border-gray-300 focus:ring-1 focus:ring-gray-500"
          />
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="h-12 w-full bg-white text-[#b0764d] rounded-lg shadow-md outline-none px-4 border border-gray-500 focus:border-gray-300 focus:ring-1 focus:ring-gray-500"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.categoryName}
              </option>
            ))}
          </select>

          <select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className="h-12 w-full bg-white text-[#b0764d] rounded-lg shadow-md outline-none px-4 border border-gray-500 focus:border-gray-300 focus:ring-1 focus:ring-gray-500"
          >
            <option value="">Select Subcategory</option>
            {subcategories
              .filter((sub) => sub.category._id === category)
              .map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.subcategoryName}
                </option>
              ))}
          </select>

          <select
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="h-12 w-full bg-white text-[#b0764d] rounded-lg shadow-md outline-none px-4 border border-gray-500 focus:border-gray-300 focus:ring-1 focus:ring-gray-500"
          >
            <option value="">Date Posted</option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Hero;
