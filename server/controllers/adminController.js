import { Admin } from "../models/adminModel.js";
import { Course } from "../models/courseModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD;

/**
 * @desc Admin Signup
 * @route POST /api/admin/signup
 */
export const adminSignup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // ✅ Validate input
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ errors: "All fields are required" });
  }

  try {
    // 🔍 Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(409).json({ errors: "Admin already exists" });
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🧾 Create admin
    const admin = await Admin.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Admin signed up successfully", admin });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ errors: "Internal server error during signup" });
  }
};

/**
 * @desc Admin Login
 * @route POST /api/admin/login
 */
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  // ✅ Validate input
  if (!email || !password) {
    return res.status(400).json({ errors: "Email and password are required" });
  }

  try {
    // 🔍 Find admin
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ errors: "Admin not found" });
    }

    // 🔐 Compare password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ errors: "Invalid credentials" });
    }

    // 🧠 Generate JWT
    const token = jwt.sign({ id: admin._id }, JWT_ADMIN_PASSWORD, {
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
    res.status(200).json({ message: "Login successful", admin, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ errors: "Internal server error during login" });
  }
};

/**
 * @desc Get courses created by admin
 * @route GET /api/admin/courses
 * @middleware adminMiddleware
 */
export const adminCourses = async (req, res) => {
  const creatorId = req.adminId;

  try {
    const courses = await Course.find({ creatorId });

    if (!courses || courses.length === 0) {
      return res.status(404).json({ errors: "No courses found for this admin" });
    }

    res.status(200).json(courses);
  } catch (error) {
    console.error("Fetch admin courses error:", error);
    res.status(500).json({ errors: "Internal server error fetching courses" });
  }
};

/**
 * @desc Admin Logout
 * @route GET /api/admin/logout
 */
export const adminLogout = async (req, res) => {
  try {
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ errors: "Internal server error during logout" });
  }
};
