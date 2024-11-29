import React, { useEffect, useState } from "react";
import { useCreateBlogMutation } from "../blogSlice/BlogApiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Types/userTypes";
import { setCredentials } from "../userSlice/authSlice";

const AddBlogPage = () => {
  const [images, setImages] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [subcategory, setSubcategory] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [desciption, setDesciption] = useState<string>("");

  const [categories, setCategories] = useState([]); // To hold categories
  const [subcategories, setSubcategories] = useState([]); // To hold subcategories
  const [createBlog] = useCreateBlogMutation();

  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [navigate, userInfo]);

  // Fetch categories and subcategories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/category");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data.data); // Assuming 'data' contains categories
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
        setSubcategories(data.data); // Assuming 'data' contains subcategories
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchCategories();
    fetchSubcategories();
  }, []);

  const handlePictureChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      // Read the file as base64
      reader.onloadend = () => {
        const base64Image = reader.result as string;
        setImages(base64Image); // Set the base64 string as the image value
      };

      reader.readAsDataURL(file); // Convert the file to base64
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      
      const blogData = {
        images,
        category,
        subcategory,
        title,
        desciption,
        user: { 
          firstName: userInfo?.firstName,
          lastName: userInfo?.lastName,
          email: userInfo?.email,
          phoneNumber: userInfo?.phoneNumber,
        },
      };

      const res = await createBlog(blogData).unwrap(); 
      console.log("Response:", res);
      
      if (res.data) {
        dispatch(setCredentials({...res.data})); 
      } else {
        throw new Error("Unexpected response format");
      }
  
      alert("New blog created");
      navigate('/my-blogs');
    } catch (err) {
      console.error("Error:", err);
      alert(err?.data?.message || err.error || "An error occurred");
    }
  };
  

  return (
    <div className="flex flex-col space-x-6 p-5 justify-center items-center">
      <div className="border shadow-md p-5 w-2/3">
        <h1 className="text-xl font-semibold mb-4">Upload Main Picture</h1>
        <div className="mb-4">
          <img
            src={images || "https://via.placeholder.com/150"}
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

      {/* Blog Information Section */}
      <div className="border shadow-md p-5 w-2/3 mt-10">
        <h1 className="text-xl font-semibold mb-4">Blog Information</h1>

        {/* Category and Subcategory Dropdowns */}
        <div className="mb-4 flex space-x-4">
          {/* Category Dropdown */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-1/2 p-2 bg-gray-700 text-white rounded-md"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.categoryName}
              </option>
            ))}
          </select>

          {/* Subcategory Dropdown */}
          <select
            value={subcategory}
            onChange={(e) => setSubcategory(e.target.value)}
            className="w-1/2 p-2 bg-gray-700 text-white rounded-md"
          >
            <option value="">Select Subcategory</option>
            {subcategories
              .filter((sub) => sub.category._id === category) // Filter subcategories based on selected category
              .map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.subcategoryName}
                </option>
              ))}
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

        {/* Blog Description */}
        <textarea
          value={desciption}
          onChange={(e) => setDesciption(e.target.value)}
          placeholder="Write your text here..."
          rows="6"
          className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 rounded-md"
        />
      </div>

      {/* Save Blog Button */}
      <button
        onClick={handleSubmit}
        className="mt-10 py-3 px-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
      >
        Save Blog
      </button>
    </div>
  );
};

export default AddBlogPage;
