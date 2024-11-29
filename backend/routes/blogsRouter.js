import express from "express";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlogById,
  getUserBlog,
  updateBlog,
} from "../controllers/blogsController.js";
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, authorizeRoles("author"), createBlog);
router.get("/", getAllBlogs);
router.get("/user", protect, authorizeRoles("author", "admin"), getUserBlog);
router.put("/:id", protect, authorizeRoles("author"), updateBlog);
router.delete("/:id", protect, authorizeRoles("author", "admin"), deleteBlog);
router.get("/:id", getBlogById);

export default router;
