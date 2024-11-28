import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGetAllBlogsQuery } from "../blogSlice/BlogApiSlice";
import { Blog } from "../Types/userTypes";

const AdminBlogs = () => {
  const { data, error, isLoading } = useGetAllBlogsQuery();

  
  const [blogs, setBlogs] = useState<Blog[]>([]);

  
  useEffect(() => {
    console.log("Blog Result:", data);
  }, [data]);

  useEffect(() => {
    if (data) {
      setBlogs(data); 
    }
  }, [data]);

  const [showFullBlogs, setShowFullBlogs] = useState(false);

  const navigate = useNavigate();

  
  const toggleBlogStatus = (id: string) => {
    setBlogs((prev) =>
      prev.map((blog) =>
        blog._id === id
          ? {
              ...blog,
              status: blog.status === "active" ? "inactive" : "active", // Toggle status
            }
          : blog
      )
    );
  };

 
  const deleteBlog = (id: string) => {
    setBlogs((prev) => prev.filter((blog) => blog._id !== id)); 
  };

  
  if (isLoading) return <div>Loading...</div>;

 
  if (error) return <div>Error loading blogs: {error.message}</div>;

  
  const goToBlogsPage = () => {
    navigate("/blogs"); 
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-4">New Blogs</h3>
      <table className="w-full h-10 text-left border-collapse border border-white">
        <thead>
          <tr className="bg-[#b0764d] text-white">
            <th className="p-2 border border-white">Author Full Names</th>
            <th className="p-2 border border-white">Title</th>
            <th className="p-2 border border-white">Description</th>
            <th className="p-2 border border-white">Category</th>
            <th className="p-2 border border-white">Subcategory</th>
            <th className="p-2 border border-white">Date</th>
            <th className="p-2 border border-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.length === 0 ? (
            <tr>
              <td colSpan={4} className="p-2 text-center">
                No blogs available.
              </td>
            </tr>
          ) : (
            blogs.slice(0, 4).map((blog) => (
              <tr key={blog._id}>
                <td className="p-2 border border-white">
                  {blog.user?.firstName} {blog.user?.lastName}
                </td>
                <td className="p-2 border border-white">
                  {blog.title.length > 10
                    ? blog.title.substring(0, 10) + "..."
                    : blog.title}
                </td>
                <td className="p-2 border border-white">
                  {/* Handle the desciption (with typo) field */}
                  {blog.desciption && blog.desciption.length > 10
                    ? blog.desciption.substring(0, 10) + "..."
                    : blog.desciption || "No description available"}
                </td>
                <td className="p-2 border border-white">
                  {blog.category?.categoryName}
                </td>
                <td className="p-2 border border-white">
                  {blog.subcategory?.subcategoryName}
                </td>
                <td className="p-2 border border-white">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2 border border-white flex gap-2">
                  <button
                    onClick={() => toggleBlogStatus(blog._id)}
                    className={`px-3 py-1 text-white rounded ${blog.status === "active" ? "bg-red-500" : "bg-green-500"}`}
                  >
                    {blog.status === "active" ? "Deactivate" : "Activate"}
                  </button>
                  <Link to={`/blog/${blog._id}`} key={blog._id}
                    className="px-3 py-1 text-white bg-gray-500 rounded"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {!showFullBlogs && (
        <button
          onClick={() => setShowFullBlogs(true)}
          className="mt-4 px-4 py-2 text-white bg-[#b0764d] rounded"
        >
          Show All Blogs
        </button>
      )}
      {showFullBlogs && (
        <button
          onClick={goToBlogsPage}
          className="mt-4 px-4 py-2 text-white bg-[#b0764d] rounded"
        >
          Go to Blogs Page
        </button>
      )}
    </div>
  );
};

export default AdminBlogs;
