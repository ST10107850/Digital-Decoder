import Blogs from "../models/blogModel.js";
import expressAsyncHandler from "express-async-handler";

export const createBlog = expressAsyncHandler(async (req, res) => {
  const { subcategory, images, title, desciption } = req.body;

  if (!subcategory || !images || !title || !desciption) {
    res.status(400);
    throw new Error(
      "All fields are required (subcategory, images, title, description)."
    );
  }

  // Create a new blog
  const newBlog = await Blogs.create({
    user: req.User._id, // Assuming req.User is set by middleware
    subcategory,
    images,
    title,
    desciption,
  });

  // Populate the user information (author details)
  const populatedBlog = await Blogs.findById(newBlog._id).populate({
    path: "user",
    select: "firstName lastName email phoneNumber", // Fields to include
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
    const getAlllBlog = await Blogs.find({});
    res.status(201).json(getAlllBlog);
  } catch (error) {
    res.status(400);
    throw new Error("Error trying to retrive blogs");
  }
});

export const getUserBlog = expressAsyncHandler(async (req, res) => {
  // console.log(String(req.User._id));
  const blogs = await Blogs.find({ user: req.User._id });

  if (blogs) {
    res.status(200).json(blogs);
  } else {
    res.status(404);
    throw new Error("No product found for this user");
  }
});
export const getUserBlogDetails = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  // Use Mongoose's findById method, which is asynchronous and returns a promise
  const blog = await Blogs.findById(id);

  if (blog) {
    res.json(blog); // Return the blog data if found
  } else {
    res.status(404).json({ message: "Blog not found" }); // Return a 404 if no blog is found
  }
});

