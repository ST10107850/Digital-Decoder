import User from "../models/userModel.js";
import expressAsyncHandler from "express-async-handler";
import { generateToken } from "../utils/generateToken.js";

export const authUser = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image,
      phoneNumber: user.phoneNumber,
      status: user.status,
      role: user.role,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

export const createUser = expressAsyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    image,
    phoneNumber,
    status,
    role,
    email,
    password,
  } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Email and password are required");
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  } else {
    const newUser = await User.create({
      firstName,
      lastName,
      image,
      phoneNumber,
      status,
      role,
      email,
      password,
    });

    if (newUser) {
      generateToken(res, newUser._id);
      res.status(201).json({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        image: newUser.image,
        phoneNumber: newUser.phoneNumber,
        status: newUser.status,
        role: newUser.role,
        email: newUser.email,
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
});

export const updateProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.User._id);

  if (user) {
    (user.firstName = req.body.firstName || user.firstName),
      (user.lastName = req.body.lastName || user.lastName),
      (user.image = req.body.image || user.image),
      (user.phoneNumber = req.body.phoneNumber || user.phoneNumber),
      (user.email = req.body.email || user.email);

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedProfile = await user.save();

    res.status(200).json({
      success: true,
      message: "Profile Updated",
      data: {
        _id: updatedProfile._id,
        firstName: updatedProfile.firstName,
        lastName: updatedProfile.lastName,
        image: updatedProfile.image,
        phoneNumber: updatedProfile.phoneNumber,
        email: updatedProfile.email,
      },
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

export const logout = expressAsyncHandler(async (req, res) => {
  res.cookie("jwt", " ", {
    httpOnly: true,
    expires: new Date(0),
  }),
    res.status(200).json({ message: "Logged out" });
});

export const getUserProfile = expressAsyncHandler(async (req, res) => {
  const user = {
    _id: req.User._id,
    firstName: req.User.firstName,
    lastName: req.User.lastName,
    image: req.User.image,
    phoneNumber: req.User.phoneNumber,
    email: req.User.email,
  };
  res.status(200).json({ message: "Profile User", data: user });
});

export const deleteProfile = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.User._id);

  if (user) {
    await user.deleteOne();
    res.cookie("jwt", " ", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "Use profile deleted succ" });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

export const getAllUsers = expressAsyncHandler(async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      res.status(404);
      throw new Error("No user found");
    }

    res
      .status(200)
      .json({ message: "Users fetched successfully", data: users });
  } catch (error) {
    res.status(500);
    throw new Error("Error fetching categories");
  }
});
