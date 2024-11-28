import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();
router.post("/",createCategory)
router.get("/", getCategories);
router
  .route("/:id")
  .delete(deleteCategory)
  .put(updateCategory);
export default router;
