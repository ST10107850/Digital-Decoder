import { Blog } from "../Types/userTypes";
import { Link } from "react-router-dom";
import { useGetUserBlogsQuery } from "../blogSlice/BlogApiSlice";
import CardComponents from "./CardComponents";
import Pagination from "./Pagnation";
import React, { useEffect, useState } from "react";

interface BlogsProps {
  filters: {
    search: string;
    category: string;
    subcategory: string;
    date: Date;
  };
}

const MyBlogs: React.FC<BlogsProps> = ({ filters }) => {
  const { data: blogs, isLoading, isError } = useGetUserBlogsQuery();
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    if (blogs) {
      let filtered = blogs;
  
      if (filters) {
        if (filters.search) {
          filtered = filtered.filter(
            (blog) =>
              blog.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
              blog.desciption
                ?.toLowerCase()
                .includes(filters.search.toLowerCase())
          );
        }
  
        if (filters.category) {
          filtered = filtered.filter(
            (blog) => blog.category && blog.subcategory._id === filters.category
          );
        }
  
        if (filters.subcategory) {
          filtered = filtered.filter(
            (blog) =>
              blog.subcategory && blog.subcategory._id === filters.subcategory
          );
        }
  
        if (filters.date) {
          if (filters.date === "latest") {
            filtered = [...filtered].sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            );
          } else if (filters.date === "oldest") {
            filtered = [...filtered].sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            );
          }
        }
      }
  
      setFilteredBlogs(filtered);
    }
  }, [filters, blogs]);

  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-2xl text-center py-10 text-red-500 font-bold">
        You account is not approved you can't post or see you blogs{" "}
      </div>
    );
  }

  return (
    <div className="mt-5 px-[150px]">
      <div className="w-full bg-orange-100 flex justify-between py-4 px-4 shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 uppercase">My Blogs</h1>
        <Link
          to="/create"
          className="text-2xl font-bold text-gray-800 uppercase"
        >
          Create New Blog
        </Link>
      </div>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((item: Blog) => (
            <Link to={`/blog/${item._id}`} key={item._id}>
              <CardComponents
                images={item.images}
                title={item.title}
                description={item.desciption}
              />
            </Link>
          ))
        ) : (
         
          <div className="col-span-full text-center text-gray-600 text-lg">
            No blogs found. Please try adjusting your filters or search.
          </div>
        )}
      </div>

      
      {filteredBlogs.length > 0 && (
        <Pagination currentPage={1} totalPages={20} onPageChange={(page) => {}} />
      )}
    </div>
  );
};

export default MyBlogs;
