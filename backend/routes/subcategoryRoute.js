import express from "express";
import {
  createSubcategory,
  deleteSubcategory,
  getSubcategories,
  updateSubcategory
} from "../controllers/subcategoryController.js";

const router = express.Router();
router.post("/",createSubcategory)
router.get("/", getSubcategories)
router
  .route("/:id")
  .delete(deleteSubcategory)
  .put(updateSubcategory);
export default router;
