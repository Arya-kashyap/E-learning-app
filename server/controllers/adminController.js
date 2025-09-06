import { Admin } from "../models/adminModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_ADMIN_PASSWORD } from '../config.js'
import { Course } from "../models/courseModel.js";
import { connectDB } from '../utils/connectDB.js';

export const adminSignup = async (req, res) => {
     const { firstName, lastName, email, password } = req.body;
     const hashPassword = await bcrypt.hash(password, 10);
     try {
          await connectDB();
          if (!firstName || !lastName || !email || !password) {
               return res.status(400).json({ errors: "all field are required" })
          }

          const userAlreadyExist = await Admin.findOne({ email: email });
          if (userAlreadyExist) {
               return res.status(400).json({ errors: "admin already exist" })
          };
          
          const userData = {
               firstName,
               lastName,
               email,
               password: hashPassword,
          }

          const user = await Admin.create(userData);
          res.status(201).json({ message: "admin signup successfully", user });
     } catch (error) {
          console.log(error, "error in signup");

     }
}

export const adminLogin = async (req, res) => {
     const { email, password } = req.body;
     try {
          await connectDB();
          const user = await Admin.findOne({ email: email });
          if(!user){
               return res.status(400).json({ errors: "Admin not found" });
          }

          const isPassword = await bcrypt.compare(password, user.password);
          if (!user || !isPassword) {
               return res.status(400).json({ errors: "invailed crenditial" });
          }

          // jwt code
          const token = jwt.sign(
               {
                    id: user._id,
               },
               JWT_ADMIN_PASSWORD,
               { expiresIn: '1d' }
          );
          const cookiesOption = {
               expires: new Date(Date.now() + 24 * 60 * 60 * 1000),  // 1day
               httpOnly: true,
               secure: process.env.NODE_ENV = "production",
               sameSite: "Strict"
          }
          res.cookie("jwt", token, cookiesOption)
          res.status(200).json({ message: "login successfully", user, token });
     } catch (error) {
          console.log(error, "error in login ");

     }
}

export const adminCourses = async (req, res) => {
     const creatorId = req.adminId;
     console.log(creatorId, "creatorId");
  try {
     await connectDB();
    const courses = await Course.find({ creatorId });

    if (!courses || courses.length === 0) {
      return res.status(400).json({ errors: "No courses found for this admin" });
    }

    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching admin courses:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const adminLogout = async (req, res) => {
     try {
          await connectDB();
          // if(!req.cookies.jwt){
          //      return res.status(400).json({error: "Login first"})
          // }
          res.clearCookie("jwt");
          res.status(200).json({ message: "logout successfully" });
     } catch (error) {
          console.log("error in logout", error)
     }
}