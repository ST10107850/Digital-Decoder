import express from "express";
import {
  authUser,
  createUser,
  deleteProfile,
  getAllUsers,
  getUserProfile,
  logout,
  updateProfile,
  updateUserStatus,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.post("/auth", authUser);
router.post("/logout", logout);
router.patch('/:id/status', updateUserStatus);
router
  .route("/profile")
  .put(protect, updateProfile)
  .get(protect, getUserProfile)
  .delete(protect, deleteProfile)
export default router;
