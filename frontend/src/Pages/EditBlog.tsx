import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetBlogByIdQuery,
  useUpdateBlogMutation,
} from "../blogSlice/BlogApiSlice";

const EditBlog = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  // States for managing the form data
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [desciption, setDesciption] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]); 

  
  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/category");
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const data = await response.json();
      setCategories(data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  
  const fetchSubcategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/subcategory");
      if (!response.ok) {
        throw new Error("Failed to fetch subcategories");
      }
      const data = await response.json();
      setSubcategories(data.data); 
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  
  const { data: blog, isLoading, isError, error } = useGetBlogByIdQuery(id);


  const [updateBlog] = useUpdateBlogMutation();

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();

    if (blog) {
      setTitle(blog.title);
      setDesciption(blog.desciption);

      if (blog.category) {
        setCategory(blog.category._id);
      }

      if (blog.subcategory) {
        setSubcategory(blog.subcategory._id);
      }

      setImage(blog.images);
    }
  }, [blog]);

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); 
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const blogData = {
      title,
      desciption,
      category,
      subcategory,
      images: image,
    };
  
    try {
      const response = await updateBlog({ id, blogData }).unwrap();
      console.log("Update Response:", response); 
      alert("Blog updated successfully!");
      navigate(`/blog/${id}`);
    } catch (err) {
      console.error("Error updating blog:", err);
      alert("Error updating blog: " + (err?.message || "Unknown error"));
    }
  };
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error?.message || "Failed to fetch blog data"}</div>;
  }

  return (
    <div className="flex flex-col space-x-6 p-5 justify-center items-center">
      <div className="border shadow-md p-5 w-2/3">
        <h1 className="text-xl font-semibold mb-4">Upload Main Picture</h1>
        <div className="mb-4">
          <img
            src={image || "https://via.placeholder.com/150"}
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

      
      <div className="border shadow-md p-5 w-2/3 mt-10">
        <h1 className="text-xl font-semibold mb-4">Blog Information</h1>

        
        <div className="mb-4 flex space-x-4">
          <select
            value={category || ""} 
            onChange={(e) => setCategory(e.target.value)}
            className="w-1/2 p-2 bg-gray-700 text-white rounded-md"
          >
            <option value="">Select Category</option>
            {categories.length > 0 ? (
              categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.categoryName}
                </option>
              ))
            ) : (
              <option disabled>No categories available</option>
            )}
          </select>

          {/* Subcategory Dropdown */}
          <select
            value={subcategory || ""} // Handle case where subcategory might be null or undefined
            onChange={(e) => setSubcategory(e.target.value)}
            className="w-1/2 p-2 bg-gray-700 text-white rounded-md"
          >
            <option value="">Select Subcategory</option>
            {subcategories.length > 0 ? (
              subcategories
                .filter((sub) => sub.category._id === category) // Filter subcategories based on selected category
                .map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.subcategoryName}
                  </option>
                ))
            ) : (
              <option disabled>No subcategories available</option>
            )}
          </select>
        </div>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Blog Title"
          className="w-full p-3 mb-4 bg-gray-700 text-white placeholder-gray-400 rounded-md"
        />

        <textarea
          value={desciption}
          onChange={(e) => setDesciption(e.target.value)}
          placeholder="Write your text here..."
          rows="6"
          className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 rounded-md"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="mt-10 py-3 px-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
      >
        Save Blog
      </button>
    </div>
  );
};

export default EditBlog;
