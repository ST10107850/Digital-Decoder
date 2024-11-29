import React, { useState, useEffect } from 'react';
import { useGetAllBlogsQuery } from '../blogSlice/BlogApiSlice'; 
import CardComponents from './CardComponents';

const DevelopmentTopics = () => {
  const { data, error, isLoading } = useGetAllBlogsQuery(); 
  const [filteredBlogs, setFilteredBlogs] = useState([]); 

  useEffect(() => {
    if (data) {
    
      const developmentTopicsBlogs = data.filter(
        (blog) => blog.category?.categoryName === "Development Topics"
      );
      
      setFilteredBlogs(developmentTopicsBlogs.slice(0, 4)); 
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading blogs: {error.message}</div>;

  return (
    <div className="mt-5 px-[150px]">
      <div className="w-full bg-[#b0764d] flex justify-center py-4 shadow-md">
        <h1 className="text-2xl font-bold text-white uppercase">Development Topics</h1>
      </div>
      <div className="mt-6">
        {filteredBlogs.length === 0 ? (
          <div className="text-center text-xl text-gray-600 mt-6">
            No Data Found
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredBlogs.map((blog) => (
              <CardComponents
                key={blog._id} 
                images={blog.images}
                title={blog.title}
                description={blog.desciption}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DevelopmentTopics;
