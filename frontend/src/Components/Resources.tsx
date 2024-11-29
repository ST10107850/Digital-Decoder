import  { useEffect, useState } from 'react';
import { useGetAllBlogsQuery } from '../blogSlice/BlogApiSlice';
import CardComponents from './CardComponents';
import { Blog } from '../Types/userTypes';

const Resources = () => {
  const { data, error, isLoading } = useGetAllBlogsQuery(); 
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]); 

  useEffect(() => {
    if (data) {
      
      const resourcesBlogs = data.filter(blog => blog.category?.categoryName === "Resources");
      setFilteredBlogs(resourcesBlogs.slice(0, 4));
    }
  }, [data]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading blogs: {error.message}</div>;

  return (
    <div className="mt-5 px-[150px]">
      {/* Header Section */}
      <div className="w-full bg-[#b0764d] flex justify-center py-4 shadow-md">
        <h1 className="text-2xl font-bold text-white uppercase">Development Topics</h1>
      </div>

      {/* Card Section */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Reusable Cards */}
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => (
            <CardComponents key={blog._id} images ={blog.images} title= {blog.title} desciption= {blog.desciption}  />
          ))
        ) : (
          <p>No blogs found in the "Resources" category.</p>
        )}
      </div>
    </div>
  );
};

export default Resources;
