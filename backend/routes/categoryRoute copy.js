import express from "express";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "../controllers/blogsController.js";

const router = express.Router();
router.post("/",createCategory)
router
  .route("/:id")
  .delete(deleteCategory)
  .put(updateCategory);
export default router;
