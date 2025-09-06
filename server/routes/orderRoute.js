import express from "express";
import { orderData } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", orderData);

export default router;