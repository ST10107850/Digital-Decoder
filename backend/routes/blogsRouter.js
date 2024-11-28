import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  getUserBlog,
  updateBlog,
} from "../controllers/blogsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createBlog);
router.get("/", protect, getAllBlogs);
router.get("/user", protect, getUserBlog);
// router.get("/:categoryName", protect, getBlogsByCategory)
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);
router.get("/:id", protect, getBlogById);

export default router;
