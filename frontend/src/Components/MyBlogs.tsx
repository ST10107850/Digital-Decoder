import React from "react";
import { Blog } from "../Types/userTypes";
import { Link } from "react-router-dom";
import { useGetUserBlogsQuery } from "../blogSlice/BlogApiSlice";

const MyBlogs = () => {
  const { data: blogs, isLoading, isError, error } = useGetUserBlogsQuery();

  // console.log(data: blogs);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.data?.message || "Failed to fetch user blogs"}</div>;
  }

  if (!blogs || blogs.length === 0) {
    return <div>No blogs found for this user.</div>;
  }

  return (
    <div className="mt-5 px-[150px]">
      <h1 className="text-2xl font-bold text-gray-800 uppercase">My Blogs</h1>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
        {blogs.map((blog: Blog) => (
          <Link to={`/blog/${blog._id}`} key={blog._id}>
            <div className="p-4 border rounded shadow-md">
              <h2 className="font-bold text-lg">{blog.title}</h2>
              <p className="text-gray-600">
                {blog.description.length > 100
                  ? `${blog.description.substring(0, 100)}...`
                  : blog.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyBlogs;
