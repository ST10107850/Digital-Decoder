import Blogs from "../models/blogModel.js";
import expressAsyncHandler from "express-async-handler";

export const createBlog = expressAsyncHandler(async (req, res) => {
  const { subcategory, images, title, desciption } = req.body;
  // const id = req.User._id;

  console.log("User in createBlog:", req.User); 

  if (!subcategory || !images || !title || !desciption) {
    res.status(400);
    throw new Error("All fields are required (subcategory, images, title, desciption).");
  }

  const newBlog = await Blogs.create({
    user: req.User._id,
    subcategory,
    images,
    title,
    desciption
  });

  res.status(201).json({
    message: "Blog created successfully",
    data: newBlog,
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

export const getAllBlogs = expressAsyncHandler(async(req,res)=>{
  try {
    const getAlllBlog = await Blogs.find({});
    res.status(201).json(getAlllBlog);
  } catch (error) {
    res.status(400);
    throw new Error("Error trying to retrive blogs")
  }
})
        

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