import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllBlogsQuery } from "../blogSlice/BlogApiSlice";
import { Blog } from "../Types/userTypes";

const AdminBlogs = ({ isDashboard = false }) => {
  const { data, error, isLoading } = useGetAllBlogsQuery();

  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categoryFilter, setCategoryFilter] = useState(""); 
  const [subcategoryFilter, setSubcategoryFilter] = useState(""); 
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    console.log("Blog Result:", data);
  }, [data]);

  useEffect(() => {
    if (data) {
      setBlogs(data); 
    }
  }, [data]);

 
  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory =
      categoryFilter ? blog.category?.categoryName === categoryFilter : true;
    const matchesSubcategory =
      subcategoryFilter
        ? blog.subcategory?.subcategoryName === subcategoryFilter
        : true;
    const matchesSearchQuery =
      searchQuery &&
      (blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.desciption?.toLowerCase().includes(searchQuery.toLowerCase()));

    return (
      matchesCategory &&
      matchesSubcategory &&
      (searchQuery ? matchesSearchQuery : true)
    );
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading blogs: {error.message}</div>;

  return (
    <div>
      <h3 className="text-xl font-bold mb-4 mt-10">New Blogs</h3>

    
      <div className="mb-4">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded mr-4"
        >
          <option value="">All Categories</option>
          {data &&
            [...new Set(data.map((blog) => blog.category?.categoryName))].map(
              (category, index) => (
                <option key={index} value={category}>
                  {category}
                </option>
              )
            )}
        </select>

        <select
          value={subcategoryFilter}
          onChange={(e) => setSubcategoryFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded mr-4"
        >
          <option value="">All Subcategories</option>
          {data &&
            [...new Set(data.map((blog) => blog.subcategory?.subcategoryName))].map(
              (subcategory, index) => (
                <option key={index} value={subcategory}>
                  {subcategory}
                </option>
              )
            )}
        </select>

        <input
          type="text"
          placeholder="Search by title or description"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded"
        />
      </div>

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
          {filteredBlogs.length === 0 ? (
            <tr>
              <td colSpan={7} className="p-2 text-center">
                No blogs found matching the filter or search criteria.
              </td>
            </tr>
          ) : (
            (isDashboard ? filteredBlogs.slice(0, 5) : filteredBlogs).map((blog) => (
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
                  {/* Handle the description (with typo) field */}
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
                  <Link
                    to={`/blog/${blog._id}`}
                    key={blog._id}
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

      <Link
        to="/admin-blog"
        className={`${
          isDashboard ? "block" : "hidden"
        } mt-4 px-4 py-2 text-white bg-[#b0764d] rounded w-[140px]`}
      >
        Show All Blogs
      </Link>
    </div>
  );
};

export default AdminBlogs;
