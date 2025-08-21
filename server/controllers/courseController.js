import { Course } from "../models/courseModel.js";
import { Purchase } from "../models/purchaseModel.js";
// import {v2 as cloudinary} from 'cloudinary'

export const createCourse = async (req, res) => {
     const adminId = req.adminId
     const { title, description, price } = req.body;

     try {
          if (!title || !description || !price) {
               return res.status(400).json({ error: "all fields are require" })
          }

          // const {image} = req.files
          // if(!req.files || Object.keys(req.files).length===0){
          //      return res.status(400).json({message:"no file uploaded"});
          // }

          // const allowedFormate = ["image/png", "image/jpeg"]
          // if(!allowedFormate.includes(image.mimetype)){
          //      return res.status(400).json({error:"invalid formate"})
          // }

          // const cloud_response = await cloudinary.uploader.upload(image.useTempFiles)
          // if(!cloud_response || cloud_response.error){
          //      res.status(400).json({error:"error uploading file"});
          // }

          const courseData = {
               title: title,
               description: description,
               price: price,
               // image:{
               //      public_id: cloud_response.public_id,
               //      url: cloud_response.url,
               // },
               creatorId: adminId
          }

          const course = await Course.create(courseData);
          res.json({
               messege: "course create successfully",
               course
          })
     } catch (error) {
          console.log(error)
     }
};

export const updataCourse = async (req, res) => {
     const adminId = req.adminId;
     const { courseId } = req.params;
     const { title, description, price } = req.body;
     try {
          const course = await Course.updateOne({
               _id: courseId,
               creatorId: adminId
          }, {
               title,
               description,
               price,
          });
          res.status(201).json({ messege: "course update successfully" })
     } catch (error) {
          console.log("error in course update");

     }
}

export const deleteCourse = async (req, res) => {
     const adminId = req.adminId;
     const { courseId } = req.params;
     try {
          const course = await Course.findOneAndDelete({
               _id: courseId,
               creatorId: adminId
          });
          if (!course) {
               return res.json({ messege: "course not found" })
          }
          res.status(201).json({ message: "course delete successfully" })
     } catch (error) {
          console.log("error in delete course ");

     }
}

export const getCourse = async (req, res) => {
     try {
          const courses = await Course.find({})
          res.status(201).json(courses);
     } catch (error) {
          console.log("error in course find", error);

     }
}

export const courseDetails = async (req, res) => {
     const { courseId } = req.params;
     try {
          const course = await Course.findById({
               _id: courseId
          });
          if (!course) {
               return res.status(400).json({ message: "course not found" })
          }
          res.status(201).json(course);
     } catch (error) {
          console.log("error in course detail");

     }
}

export const buyCourse = async (req, res) => {
     const { userId } = req;
     const { courseId } = req.params;
     try {
          const course = await Course.findById(courseId);
          if (!course) {
               return res.status(400).json({ error: "Course not found" });
          }

          const existingPurchase = await Purchase.findOne({ userId, courseId });
          if (existingPurchase) {
               return res.status(400).json({ error: "user already purchased this course" });
          }
          
          const newPurchase = new Purchase({ userId, courseId });
          await newPurchase.save();
          res.status(200).json({ messege: "course purchased successfully", newPurchase })
     } catch (error) {
          res.status(400).json({ error: "error in course buy" })
          console.log(error, "error in course buy");

     }
}

