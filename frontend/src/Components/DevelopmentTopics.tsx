import React, { useState, useEffect } from 'react';
import CardComponents from './CardComponents';

const DevelopmentTopics = () => {
  const [blogs, setBlogs] = useState([]); // Store blogs
  const [filteredBlogs, setFilteredBlogs] = useState([]); // Store filtered blogs

  // Fetch Blogs from the API
  const fetchBlogs = async () => {
    try {
      // Make sure to encode the category name for URL safety
      const response = await fetch(`http://localhost:5000/api/blogs/category/Development%20Topics`);
      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }
      const data = await response.json();
      setBlogs(data); // Assuming the 'data' contains blog details
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };
  

  // Filter blogs based on the category name "Development Topics"
  useEffect(() => {
    if (blogs.length > 0) {
      const filtered = blogs.filter(
        (blog) => blog.category?.categoryName === "Development Topics"
      );
      setFilteredBlogs(filtered);
    }
  }, [blogs]); // Re-run filtering when blogs data changes

  // Fetch blogs when the component mounts
  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="mt-5 px-[150px]">
      {/* Header Section */}
      <div className="w-full bg-[#b0764d] flex justify-center py-4 shadow-md">
        <h1 className="text-2xl font-bold text-white uppercase">Development Topics</h1>
      </div>

      {/* Card Section */}
      <div className="mt-6">
        {/* Check if there are any filtered blogs */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center text-xl text-gray-600 mt-6">
            No Data Found
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Map through the filtered blogs and render cards */}
            {filteredBlogs.map((blog) => (
              <CardComponents
                key={blog._id} // Assuming each blog has a unique _id
                images={blog.images} // Assuming blog has an image
                title={blog.title} // Assuming blog has a title
                description={blog.desciption} // Assuming blog has a description
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DevelopmentTopics;
