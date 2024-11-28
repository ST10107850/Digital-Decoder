import express from "express";
import {
  authUser,
  createUser,
  deleteProfile,
  getUserProfile,
  logout,
  updateProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createUser);
router.post("/auth", authUser);
router.post("/logout", logout);
router
  .route("/profile")
  .put(protect, updateProfile)
  .get(protect, getUserProfile)
  .delete(protect, deleteProfile)
export default router;
