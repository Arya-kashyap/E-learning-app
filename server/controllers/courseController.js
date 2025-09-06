import { Course } from "../models/courseModel.js";
import { Purchase } from "../models/purchaseModel.js";
import { connectDB } from '../utils/connectDB.js';
import dotenv from 'dotenv'
dotenv.config();
import Stripe from 'stripe'
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // or your actual key


export const createCourse = async (req, res) => {
  const adminId = req.adminId;
  const { title, description, price } = req.body;

  try {
     await connectDB();
    if (!title || !description || !price) {
      return res.status(400).json({ errors: "All fields are required" });
    }

    const course = new Course({
      title,
      description,
      price,
      creatorId: adminId,
    });

    await course.save();
    res.status(201).json({ message: 'Course created successfully', course });
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: "Server error" });
  }
};

export const updataCourse = async (req, res) => {
     const adminId = req.adminId;
     const { courseId } = req.params;
     const { title, description, price } = req.body;
     try {
          await connectDB();
          if (!title || !description || !price) {
               return res.status(400).json({ errors: "all field are required" })
          }
          const course = await Course.updateOne({
               _id: courseId,
               creatorId: adminId
          }, {
               title,
               description,
               price,
          });
          res.status(201).json({ message: "course update successfully" })
     } catch (error) {
          console.log("error in course update");

     }
}

export const deleteCourse = async (req, res) => {
     const adminId = req.adminId;
     const { courseId } = req.params;
     try {
          await connectDB();
          const course = await Course.findOneAndDelete({
               _id: courseId,
               creatorId: adminId
          });
          if (!course) {
               return res.json({ errors: "course not found" })
          }
          res.status(201).json({ message: "course delete successfully" })
     } catch (error) {
          console.log("error in delete course ");

     }
}

export const getCourse = async (req, res) => {
     try {
          await connectDB();
          const courses = await Course.find({})
          res.status(201).json(courses);
     } catch (error) {
          console.log("error in course find", error);
          res.status(400).json({ errors: "error in course find" });

     }
}

export const courseDetails = async (req, res) => {
     const { courseId } = req.params;
     try {
          await connectDB();
          const course = await Course.findById({
               _id: courseId
          });
          if (!course) {
               return res.status(400).json({ errors: "course not found" })
          }
          res.status(201).json(course);
     } catch (error) {
          console.log("error in course detail");
          res.status(400).json({ errors: "error in course detail" });

     }
}


export const buyCourse = async (req, res) => {
     const { userId } = req;
     const { courseId } = req.params;

     try {
          await connectDB();
          const course = await Course.findById(courseId);
          if (!course) {
               return res.status(404).json({ errors: "Course not found" });
          }
          const existingPurchase = await Purchase.findOne({ userId, courseId });
          if (existingPurchase) {
               return res
                    .status(400)
                    .json({ errors: "User has already purchased this course" });
          }

          // stripe payment code goes here!!
          const amount = course.price;
          const paymentIntent = await stripe.paymentIntents.create({
               amount: amount,
               currency: "usd",
               payment_method_types: ["card"],
          });

          res.status(201).json({
               message: "Course purchased successfully",
               course,
               clientSecret: paymentIntent.client_secret,
          });
     } catch (error) {
          res.status(500).json({ errors: "Error in course buying" });
          console.log("error in course buying ", error);
     }
};

