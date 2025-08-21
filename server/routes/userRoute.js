import express from 'express';
import { purchasedCourse, userLogin, userLogout, userSignup } from '../controllers/userController.js'
import userMiddleware from '../middleware/userMiddle.js';

const router = express.Router();

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.get("/logout", userLogout);
router.get("/purchased", userMiddleware, purchasedCourse);

export default router;