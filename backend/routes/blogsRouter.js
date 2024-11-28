import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getUserBlog,
  updateBlog,
} from "../controllers/blogsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createBlog);
router.get("/", getAllBlogs);
router.get('/user', protect, getUserBlog)
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);

export default router;
