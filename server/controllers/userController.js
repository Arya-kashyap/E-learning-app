import { User } from "../models/userModel.js";
import bcrypt from 'bcrypt';
import { JWT_USER_PASSWORD } from "../config.js";
import jwt from 'jsonwebtoken';
import { Course } from "../models/courseModel.js";
import { Purchase } from "../models/purchaseModel.js";
import { connectDB } from '../utils/connectDB.js';

export const userSignup = async (req, res) => {
     const { firstName, lastName, email, password } = req.body;
     const hashPassword = await bcrypt.hash(password, 10);
     try {
          await connectDB();
          if (!firstName || !lastName || !email || !password) {
               return res.status(400).json({ errors: "all field are required" })
          }

          const userAlreadyExist = await User.findOne({ email: email });
          if (userAlreadyExist) {
               return res.status(400).json({ errors: "user already exist" })
          };

          const userData = {
               firstName,
               lastName,
               email,
               password: hashPassword,
          }

          const user = await User.create(userData);
          res.status(201).json({ message: "user signup successfully", user });
     } catch (error) {
          res.status(400).json({ errors: "error in signup" });
          console.log(error, "error in signup");

     }
}

export const userLogin = async (req, res) => {
     const { email, password } = req.body;
     try {
          await connectDB();
          const user = await User.findOne({ email: email });
          if(!user){
               return res.status(403).json({ errors: "User not found" });
          }

          const isPassword = await bcrypt.compare(password, user.password);
          if (!user || !isPassword) {
               return res.status(403).json({ errors: "Invailed crenditial" });
          }

          // jwt code
          const token = jwt.sign(
               {
                    id: user._id,
               },
               JWT_USER_PASSWORD,
               { expiresIn: '1d' }
          );
          const cookiesOption = {
               expires: new Date(Date.now() + 24 * 60 * 60 * 1000),  // 1day
               httpOnly: true,
               secure: process.env.NODE_ENV = "production",
               sameSite: "Strict"
          }
          res.cookie("jwt", token, cookiesOption)
          res.status(200).json({ message: "Login successfully", user, token });
     } catch (error) {
          console.log(error, "error in login ");
          res.status(400).json({ errors: "error in login" });
     }
}

export const userLogout = async (req, res) => {
     try {
          await connectDB();
          res.clearCookie("jwt");
          res.status(200).json({ message: "Logout successfully" });
     } catch (error) {
          console.log("error in logout", error)
          res.status(400).json({ errors: "error in logout" });
     }
}

export const purchasedCourse = async (req, res) => {
     const userId = req.userId;
     try {
          await connectDB();
          const purchase = await Purchase.find({ userId })
          let purchasedCourseId = []
          for (let i = 0; i < purchase.length; i++) {
               purchasedCourseId.push(purchase[i].courseId)
          }
          
          const courseData = await Course.find({
               _id: { $in: purchasedCourseId },
          });
          res.status(200).json({ message: "All purchased courses", purchase, courseData })
     } catch (error) {
          console.log(error, "error in get purchased course");
          res.status(400).json({ errors: "error in get purchased course" });

     }

}