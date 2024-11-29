import Blogs from "../models/blogModel.js";
import expressAsyncHandler from "express-async-handler";

export const createBlog = expressAsyncHandler(async (req, res) => {
  const { category, subcategory, images, title, desciption } = req.body;

  // Ensure all fields are provided
  if (!category || !subcategory || !images || !title || !desciption) {
    res.status(400);
    throw new Error("All fields are required (subcategory, images, title, description).");
  }

  // Assuming `req.User` is set by a middleware and contains the authenticated user
  const user = req.User; // The authenticated user (e.g., from JWT or session)

  // Create a new blog post
  const newBlog = await Blogs.create({
    user: user._id, // Associate blog with the authenticated user
    category,
    subcategory,
    images,
    title,
    desciption,
  });

  // Populate the blog with user details (e.g., firstName, lastName, email, phoneNumber)
  const populatedBlog = await Blogs.findById(newBlog._id).populate({
    path: "user",
    select: "firstName lastName email phoneNumber", // Fields to include from the User model
  });

  res.status(201).json({
    message: "Blog created successfully",
    data: populatedBlog,
  });
});
export const updateBlog = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { subcategory, images, title } = req.body;

  const blog = await Blogs.findById(id);

  if (!blog) {
    res.status(404);
    throw new Error("Blog not found.");
  }

  if (blog.user.toString() !== req.User._id.toString()) {
    res.status(403);
    throw new Error("You are not authorized to update this blog.");
  }

  blog.subcategory = subcategory || blog.subcategory;
  blog.images = images || blog.images;
  blog.title = title || blog.title;

  const updatedBlog = await blog.save();

  res.status(200).json({
    message: "Blog updated successfully",
    data: updatedBlog,
  });
});

export const deleteBlog = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const blog = await Blogs.findById(id);

  if (!blog) {
    res.status(404);
    throw new Error("Blog not found.");
  }

  await blog.deleteOne();

  res.status(200).json({
    message: "Blog deleted successfully",
  });
});

export const getAllBlogs = expressAsyncHandler(async (req, res) => {
  try {
   
    const blogs = await Blogs.find({})
      .populate({
        path: "user", 
        select: "firstName lastName email phoneNumber image", 
      })
      .populate({
        path: "category",  
        select: "categoryName",
      })
      .populate({
        path: "subcategory", 
        select: "subcategoryName",
      });

    if (!blogs || blogs.length === 0) {
      return res.status(404).json({ message: "No blogs found." });
    }

  
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error retrieving blogs:", error);
    res.status(500).json({ message: "Error trying to retrieve blogs", error: error.message });
  }
});

export const getUserBlog = expressAsyncHandler(async (req, res) => {
  console.log("Authenticated User:", req.User);  // Debugging line
  
  const blogs = await Blogs.find({ user: req.User._id });

  if (blogs) {
    res.status(200).json(blogs);
  } else {
    res.status(404);
    throw new Error("No blogs found for this user");
  }
});

export const getBlogById = expressAsyncHandler(async (req, res) => {
  try {
    const blog = await Blogs.findById(req.params.id)
      .populate({
        path: "user", // Ensure this references the correct field (user) in the Blog model
        select: "firstName lastName email phoneNumber image", // Include the fields we need from the user model
      });

    if (!blog) {
      res.status(404);
      throw new Error("Blog not found");
    }

    res.status(200).json(blog); // Send back the populated blog object
  } catch (error) {
    res.status(400);
    throw new Error("Error trying to retrieve blog details");
  }
});

// export const getBlogsByCategory = expressAsyncHandler(async (req, res) => {
//   const { categoryName } = req.params;  // Get categoryName from route params

//   try {
//     // Fetch blogs and populate category and subcategory fields
//     const blogs = await Blogs.find({})
//       .populate({
//         path: 'category', // Populate the category field
//         select: 'categoryName', // Only fetch the categoryName field
//       })
//       .populate({
//         path: 'subcategory', // Populate the subcategory field if needed
//         select: 'subcategoryName', // Only fetch the subcategoryName field (if relevant)
//       });

//     // Filter blogs by categoryName dynamically
//     const filteredBlogs = blogs.filter(blog => blog.category?.categoryName.toLowerCase() === categoryName.toLowerCase());

//     res.status(200).json(filteredBlogs);
//   } catch (error) {
//     res.status(400);
//     throw new Error("Error retrieving blogs");
//   }
// });


