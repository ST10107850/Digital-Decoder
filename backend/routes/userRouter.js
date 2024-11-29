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
import { authorizeRoles, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", protect, authorizeRoles("admin"), getAllUsers);
router.post("/auth", authUser);
router.post("/logout", protect, logout);
router.patch("/:id/status", protect, authorizeRoles("admin"), updateUserStatus);
router
  .route("/profile")
  .put(protect, authorizeRoles("author"), updateProfile)
  .get(protect, authorizeRoles("author", "admin"), getUserProfile)
  .delete(protect, authorizeRoles("author"), deleteProfile);
export default router;
