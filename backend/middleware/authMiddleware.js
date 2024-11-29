import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import User from "../models/userModel.js";

export const protect = expressAsyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:", decoded);  // Add this line to log the decoded token

      const user = await User.findById(decoded.userId).select("-password");

      console.log("User Retrieved:", user);  // Add this line to log the user data

      if (!user) {
        res.status(404);
        throw new Error("User not found");
      }

      // Check if the user status is "Approved"
      if (user.status !== "Approved") {
        res.status(403);
        throw new Error("Access denied. Account not approved.");
      }

      req.User = user; // Attach user to the request object
      next();  // Proceed to the next middleware/route
    } catch (error) {
      console.error("Token verification failed:", error);  // Log any errors
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});



// import jwt from "jsonwebtoken";
// import expressAsyncHandler from "express-async-handler";
// import User from "../models/userModel.js";

// export const protect = expressAsyncHandler(async (req, res, next) => {
//   let token = req.cookies.jwt; // Ensure you have configured cookie-parser

//   if (token) {
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       req.User = await User.findById(decoded.userId).select("-password");
//       if (!req.User) {
//         res.status(400);
//         throw new Error("User not found");
//       }
//       next();
//     } catch (error) {
//       console.error("Token verification failed:", error); // Logs the specific error
//       res.status(400);
//       throw new Error("Not authorized, invalid token");
//     }
//   } else {
//     res.status(400);
//     throw new Error("Not authorized, no token");
//   }
// });


