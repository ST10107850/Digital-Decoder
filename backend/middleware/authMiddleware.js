import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";

export const protect = expressAsyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:", decoded);

      const user = await User.findById(decoded.userId).select("-password");

      console.log("User Retrieved:", user);

      if (!user) {
        res.status(404);
        throw new Error("User not found");
      }

      // Allow admin users to bypass the 'Approved' status check
      if (user.status !== "Approved" && user.role !== "admin") {
        res.status(403);
        throw new Error("Access denied. Account not approved.");
      }

      req.User = user;
      next();
    } catch (error) {
      console.error("Token verification failed:", error);
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});



export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (req.User && roles.includes(req.User.role)) {
      next();
    } else {
      res.status(403);
      throw new Error('Not authorized');
    }
  };
};


