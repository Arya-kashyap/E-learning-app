import express from 'express';
import {
  userSignup,
  userLogin,
  userLogout,
  purchasedCourse,
} from '../controllers/userController.js';
import userMiddleware from '../middleware/userMiddle.js';

const router = express.Router();

// 📝 Public Routes
router.post('/signup', userSignup);
router.post('/login', userLogin);

// 🔐 Protected Routes
router.get('/logout', userLogout); // Optional: protect with middleware if needed
router.get('/purchased', userMiddleware, purchasedCourse);

// 🚀 Export router
export default router;
