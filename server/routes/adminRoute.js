import express from 'express';
import { adminCourses, adminLogin, adminLogout, adminSignup } from '../controllers/adminController.js';
import adminMiddleware from '../middleware/adminMiddle.js';

const router = express.Router();

router.post('/signup', adminSignup);
router.post("/login", adminLogin);
router.post("/courses",adminMiddleware, adminCourses);
router.get("/logout", adminLogout);

export default router;