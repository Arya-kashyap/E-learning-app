import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Course } from "../models/courseModel.js";
import { Purchase } from "../models/purchaseModel.js";
import dotenv from "dotenv";
dotenv.config();
const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD;

/**
 * @desc User Signup
 * @route POST /api/user/signup
 */
export const userSignup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // ✅ Validate input
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // 🔍 Check if user already exists
    const userAlreadyExist = await User.findOne({ email });
    if (userAlreadyExist) {
      return res.status(409).json({ error: "User already exists" });
    }

    // 🔐 Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // 🧾 Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });

    res.status(201).json({ message: "User signed up successfully", user });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error during signup" });
  }
};

/**
 * @desc User Login
 * @route POST /api/user/login
 */
export const userLogin = async (req, res) => {
  const { email, password } = req.body;

  // ✅ Validate input
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    // 🔍 Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // 🔐 Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // 🧠 Generate JWT
    const token = jwt.sign({ id: user._id }, JWT_USER_PASSWORD, {
      expiresIn: "1d",
    });

    // 🍪 Set cookie options
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
    };

    res.cookie("jwt", token, cookieOptions);
    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error during login" });
  }
};

/**
 * @desc User Logout
 * @route GET /api/user/logout
 */
export const userLogout = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Internal server error during logout" });
  }
};

/**
 * @desc Get Purchased Courses
 * @route GET /api/user/purchased
 * @middleware userMiddleware
 */
export const purchasedCourse = async (req, res) => {
  const userId = req.userId;

  try {
    // 🔍 Find purchases by user
    const purchases = await Purchase.find({ userId });

    // 🧠 Extract course IDs
    const purchasedCourseIds = purchases.map((p) => p.courseId);

    // 📚 Fetch course details
    const courseData = await Course.find({ _id: { $in: purchasedCourseIds } });

    res.status(200).json({
      message: "Purchased courses retrieved successfully",
      purchases,
      courseData,
    });
  } catch (error) {
    console.error("Purchased course error:", error);
    res.status(500).json({ error: "Internal server error fetching courses" });
  }
};
