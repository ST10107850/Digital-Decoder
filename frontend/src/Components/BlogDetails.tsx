const BlogDetails = () => {
          return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-[150px] py-4">
              {/* Main Content Section */}
              <div className="col-span-2 p-6 rounded-lg shadow-md bg-white">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog Title</h1>
                <p className="text-gray-600">
                  This is a detailed description of the blog. It provides insights, information, and context about the blog topic.
                </p>
        
                {/* Edit & Delete Links */}
                <div className="flex gap-4 mt-6">
                  <a
                    href="#"
                    className="text-white bg-blue-500 hover:bg-blue-800 font-medium px-4 py-2 rounded-md"
                  >
                    Edit
                  </a>
                  <a
                    href="#"
                    className="bg-red-600 hover:bg-red-800 font-medium text-white py-2 px-4 rounded-md"
                  >
                    Delete
                  </a>
                </div>
              </div>
        
              {/* Author Section */}
              <div className="border border-gray-300 p-6 rounded-lg shadow-md bg-white">
                <h2 className="text-2xl text-center font-bold text-gray-800 mb-4">
                  Author Details
                </h2>
                <div className="flex flex-col items-center">
                  {/* Author Image */}
                  <div className="w-24 h-24 bg-blue-600 rounded-full overflow-hidden mb-4">
                    <img
                      className="w-full h-full object-cover"
                      src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png"
                      alt="Author"
                    />
                  </div>
        
                  {/* Author Info */}
                  <div className="text-lg text-center">
                    <p className="text-gray-700 font-medium mb-2">
                      <strong>Full Name:</strong> Shoki Mabitsela
                    </p>
                    <p className="text-gray-700 font-medium mb-2">
                      <strong>Email:</strong> shoki@gmail.com
                    </p>
                    <p className="text-gray-700 font-medium">
                      <strong>Phone:</strong> 123-456-7890
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        };
        
        export default BlogDetails;
        