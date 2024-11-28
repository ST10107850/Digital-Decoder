import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getUserBlog,
  getUserBlogDetails,
  updateBlog,
} from "../controllers/blogsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createBlog);
router.get("/", protect, getAllBlogs);
router.get('/user', protect, getUserBlog)
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);
router.get('/:id', protect, getUserBlogDetails);

export default router;
