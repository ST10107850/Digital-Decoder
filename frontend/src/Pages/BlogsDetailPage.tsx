import React from "react";
import BlogDetails from "../Components/BlogDetails";
import Hero from "../Components/Hero";

const BlogsDetailPage = () => {
  // You could implement filter handling here if needed, or simply leave it empty for this page
  const handleFilterChange = (filters: {
    search: string;
    category: string;
    subcategory: string;
    date: string;
  }) => {
    console.log("Filter change triggered", filters);
    // Handle filtering logic or pass it to the Blogs component
  };

  return (
    <div>
      <Hero isBlog={true} onFilterChange={handleFilterChange} />
      <BlogDetails />
    </div>
  );
};

export default BlogsDetailPage;
