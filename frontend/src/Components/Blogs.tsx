import CardComponents from "./CardComponents";
import Pagination from "./Pagnation";
import { useGetAllBlogsQuery } from "../blogSlice/BlogApiSlice";
import { Blog } from "../Types/userTypes";
import { Link } from "react-router-dom";

const Blogs = () => {
  const { data: blogs, isLoading, isError, error } = useGetAllBlogsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.data?.message || "Failed to fetch blogs"}</div>;
    // console.log(Error: isError.)
  }

  return (
    <div className="mt-5 px-[150px]">
      {/* Header Section */}
      <div className="w-full bg-orange-100 flex justify-center py-4 shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 uppercase">Blogs</h1>
      </div>

      {/* Card Section */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
        {/* Map over the blogs and display cards */}
        {blogs?.map((item: Blog) => (
          <Link to={`/blog/${item._id}`} key={item._id}>
            <CardComponents
              images={item.images}
              title={item.title}
              description={item.description}
            />
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <Pagination currentPage={1} totalPages={20} onPageChange={3} />
    </div>
  );
};

export default Blogs;
