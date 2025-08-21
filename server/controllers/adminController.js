import { Admin } from "../models/adminModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { JWT_ADMIN_PASSWORD } from '../config.js'

export const adminSignup = async (req, res) => {
     const { firstName, lastName, email, password } = req.body;
     const hashPassword = await bcrypt.hash(password, 10);
     try {
          if (!firstName || !lastName || !email || !password) {
               return res.json({ message: "all field are required" })
          }

          const userAlreadyExist = await Admin.findOne({ email: email });
          if (userAlreadyExist) {
               return res.json({ message: "admin already exist" })
          };
          
          const userData = {
               firstName,
               lastName,
               email,
               password: hashPassword,
          }

          const user = await Admin.create(userData);
          res.status(201).json({ messege: "admin signup successfully", user });
     } catch (error) {
          console.log(error, "error in signup");

     }
}

export const adminLogin = async (req, res) => {
     const { email, password } = req.body;
     try {
          const user = await Admin.findOne({ email: email });

          const isPassword = await bcrypt.compare(password, user.password);
          if (!user || !isPassword) {
               return res.status(403).json({ message: "invailed crenditial" });
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

export const adminLogout = async (req, res) => {
     try {
          // if(!req.cookies.jwt){
          //      return res.status(400).json({error: "Login first"})
          // }
          res.clearCookie("jwt");
          res.status(200).json({ messege: "logout successfully" });
     } catch (error) {
          console.log("error in logout", error)
     }
}