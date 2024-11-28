import express from "express";
import {
  createSubcategory,
  deleteSubcategory,
  updateSubcategory
} from "../controllers/subcategoryController.js";

const router = express.Router();
router.post("/",createSubcategory)
router
  .route("/:id")
  .delete(deleteSubcategory)
  .put(updateSubcategory);
export default router;
