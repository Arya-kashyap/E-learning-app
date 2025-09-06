import { Course } from "../models/courseModel.js";
import { Purchase } from "../models/purchaseModel.js";
import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * @desc Create a new course (admin only)
 * @route POST /api/course
 */
export const createCourse = async (req, res) => {
  const adminId = req.adminId;
  const { title, description, price } = req.body;

  if (!title || !description || !price) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const course = await Course.create({
      title,
      description,
      price,
      creatorId: adminId,
    });

    res.status(201).json({ message: "Course created successfully", course });
  } catch (error) {
    console.error("Create course error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @desc Update an existing course (admin only)
 * @route PUT /api/course/:courseId
 */
export const updateCourse = async (req, res) => {
  const adminId = req.adminId;
  const { courseId } = req.params;
  const { title, description, price } = req.body;

  if (!title || !description || !price) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const result = await Course.updateOne(
      { _id: courseId, creatorId: adminId },
      { title, description, price }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "Course not found or not authorized" });
    }

    res.status(200).json({ message: "Course updated successfully" });
  } catch (error) {
    console.error("Update course error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @desc Delete a course (admin only)
 * @route DELETE /api/course/:courseId
 */
export const deleteCourse = async (req, res) => {
  const adminId = req.adminId;
  const { courseId } = req.params;

  try {
    const course = await Course.findOneAndDelete({
      _id: courseId,
      creatorId: adminId,
    });

    if (!course) {
      return res.status(404).json({ error: "Course not found or not authorized" });
    }

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Delete course error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @desc Get all courses
 * @route GET /api/course
 */
export const getCourse = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json(courses);
  } catch (error) {
    console.error("Get courses error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @desc Get course details by ID
 * @route GET /api/course/detail/:courseId
 */
export const courseDetails = async (req, res) => {
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    console.error("Course detail error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @desc Purchase a course (Stripe payment)
 * @route POST /api/course/buy/:courseId
 */
export const buyCourse = async (req, res) => {
  const { userId } = req;
  const { courseId } = req.params;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const alreadyPurchased = await Purchase.findOne({ userId, courseId });
    if (alreadyPurchased) {
      return res.status(409).json({ error: "Course already purchased" });
    }

    // 💳 Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: course.price,
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.status(200).json({
      message: "Payment initiated",
      course,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Buy course error:", error);
    res.status(500).json({ error: "Internal server error during purchase" });
  }
};
