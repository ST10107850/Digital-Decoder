import { useParams, useNavigate, Link } from "react-router-dom";
import {
  useGetBlogByIdQuery,
  useDeleteBlogMutation,
} from "../blogSlice/BlogApiSlice";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: blog, isLoading, isError, error } = useGetBlogByIdQuery(id);
  const [deleteBlog] = useDeleteBlogMutation();

  if (isLoading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-xl text-red-500">
        Error: {error?.data?.message || "Failed to fetch blog details"}
      </div>
    );
  }

  if (!blog) {
    return <div className="text-center text-xl">No blog found</div>;
  }

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (confirmed) {
      try {
        await deleteBlog(blog._id).unwrap();
        alert("Blog deleted successfully!");
        navigate("/blogs");
      } catch (err) {
        alert(err?.message || "Failed to delete blog");
      }
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-[250px] py-8">
      <div className="col-span-2 p-6 rounded-lg shadow-lg bg-white flex flex-col justify-center">
        <div className="w-full md:w-96 h-auto rounded-lg overflow-hidden shadow-lg mb-6">
          <img
            className="w-full h-auto object-cover rounded-lg"
            src={blog.images}
            alt="Blog"
          />
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-4">{blog.title}</h1>
        <p className="text-gray-600 mb-6">{blog.desciption}</p>
        <div className={`flex gap-6 mt-6`}>
          <Link
            to={`/${blog._id}`}
            className="text-white bg-blue-500 hover:bg-blue-700 font-medium px-6 py-3 rounded-md transition duration-200"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 font-medium text-white py-3 px-6 rounded-md transition duration-200"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="border h-[50vh] border-gray-300 p-6 rounded-lg shadow-lg bg-white h-1/2">
        <h2 className="text-2xl text-center font-semibold text-gray-800 mb-6">
          Author Details
        </h2>
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 bg-gray-200 rounded-full overflow-hidden mb-4">
            <img
              className="w-full h-full object-contain"
              src={blog.user.image || "https://via.placeholder.com/150"}
              alt="Author"
            />
          </div>

          <div className="text-lg text-center">
            <p className="text-gray-700 font-semibold mb-2">
              <strong>Full Name:</strong> {blog.user.firstName}{" "}
              {blog.user.lastName}
            </p>
            <p className="text-gray-700 font-semibold mb-2">
              <strong>Email:</strong> {blog.user.email}
            </p>
            <p className="text-gray-700 font-semibold">
              <strong>Phone:</strong> {blog.user.phoneNumber}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
