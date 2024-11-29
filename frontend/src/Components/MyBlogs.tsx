import React from "react";
import { Blog } from "../Types/userTypes";
import { Link } from "react-router-dom";
import { useGetUserBlogsQuery } from "../blogSlice/BlogApiSlice";
import CardComponents from "./CardComponents";
import Pagination from "./Pagnation";

const MyBlogs = () => {
  const { data: blogs, isLoading, isError, error } = useGetUserBlogsQuery();

  // Ensure blogs is available and an array before attempting to log descriptions
  if (blogs && Array.isArray(blogs)) {
    blogs.forEach((blog) => {
      console.log(blog); // Logs the description of each blog
    });
  } else {
    console.log("No blogs available or data is not an array");
  }
  
  

  // console.log(data: blogs);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.data?.message || "Failed to fetch user blogs"}</div>;
  }

  return (
    <div className="mt-5 px-[150px]">
    
    <div className="w-full bg-orange-100 flex justify-between py-4 px-4 shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 uppercase">Blogs</h1>
      <Link to="/create" className="text-2xl font-bold text-gray-800 uppercase">Create New Blog</Link>
    </div>

    {/* Card Section */}
    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
      {/* Map over the blogs and display cards */}
      {blogs?.map((item: Blog) => (
        <Link to={`/blog/${item._id}`} key={item._id}>
          <CardComponents
            images={item.images}
            title={item.title}
            description={item.desciption}
          />
        </Link>
      ))}
    </div>

    {/* Pagination */}
    <Pagination currentPage={1} totalPages={20} onPageChange={3} />
  </div>
  );
  
};

export default MyBlogs;
