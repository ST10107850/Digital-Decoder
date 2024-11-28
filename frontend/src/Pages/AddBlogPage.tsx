import React, { useState } from "react";

const AddBlogPage = () => {
  const [mainPicture, setMainPicture] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [textFile, setTextFile] = useState(null);
  const [content, setContent] = useState("");

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainPicture(URL.createObjectURL(file));
    }
  };

  const handleTextFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTextFile(file);
    }
  };

  return (
    <div className="flex flex-col space-x-6 p-5 justify-center items-center">
      {/* Upload Main Picture */}
      <div className="border shadow-md p-5 w-2/3">
        <h1 className="text-xl font-semibold mb-4">Upload Main Picture</h1>
        <div className="mb-4">
          <img
            src={mainPicture || "https://via.placeholder.com/150"}
            alt="Main Picture"
            className="w-full h-48 object-cover mb-3"
          />
          <label
            htmlFor="main-picture"
            className="block text-gray-600 mb-2 cursor-pointer"
          >
            Choose Picture
          </label>
          <input
            type="file"
            id="main-picture"
            onChange={handlePictureChange}
            className="w-full text-gray-600"
          />
        </div>
      </div>

      {/* Blog Information */}
      <div className="border shadow-md p-5 w-2/3 mt-10">
        <h1 className="text-xl font-semibold mb-4">Blog Information</h1>

        {/* Category and Subcategory */}
        <div className="mb-4 flex space-x-4">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-1/2 p-2 bg-gray-700 text-white rounded-md"
          >
            <option value="">Select Category</option>
            <option value="tech">Tech</option>
            <option value="lifestyle">Lifestyle</option>
            <option value="business">Business</option>
          </select>

          <select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className="w-1/2 p-2 bg-gray-700 text-white rounded-md"
          >
            <option value="">Select Subcategory</option>
            <option value="webdev">Web Development</option>
            <option value="health">Health</option>
            <option value="startup">Startup</option>
          </select>
        </div>

        {/* Blog Title */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Blog Title"
          className="w-full p-3 mb-4 bg-gray-700 text-white placeholder-gray-400 rounded-md"
        />

        {/* Text File */}
        <div className="mb-4">
          <h2 className="text-lg font-medium text-gray-600 mb-2">Text File</h2>
          <input
            type="file"
            onChange={handleTextFileChange}
            className="w-full p-2 bg-gray-700 text-white rounded-md"
          />
        </div>

        {/* Blog Content */}
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your text here..."
          rows="6"
          className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 rounded-md"
        />
      </div>
      <button className="mt-10 py-3 px-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400">
        Save Blog
      </button>
    </div>
  );
};

export default AddBlogPage;
