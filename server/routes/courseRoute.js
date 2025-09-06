import express from "express";
import { buyCourse, courseDetails, createCourse, deleteCourse, getCourse, updataCourse } from "../controllers/courseController.js";
import userMiddleware from "../middleware/userMiddle.js";
import adminMiddleware from "../middleware/adminMiddle.js";
import upload from '../middleware/upload.js';

const router = express.Router();

router.post("/create", adminMiddleware, createCourse);
router.put("/update/:courseId", adminMiddleware, updataCourse);
router.delete("/delete/:courseId", adminMiddleware, deleteCourse);
router.get("/courses", getCourse);
router.get("/detail/:courseId", courseDetails);
router.post("/buy/:courseId", userMiddleware, buyCourse);

export default router;