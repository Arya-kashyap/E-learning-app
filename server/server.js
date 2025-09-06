// server.js
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import courseRoute from './routes/courseRoute.js';
import userRoute from './routes/userRoute.js';
import adminRoute from './routes/adminRoute.js';
import orderRoute from './routes/orderRoute.js';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import { connectDB } from './utils/connectDB.js';
import cors from 'cors';

dotenv.config();

const app = express();

// ✅ Connect to MongoDB
await connectDB();

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
}));

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// ✅ Routes
app.use("/api/course", courseRoute);
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/order", orderRoute);

// app.listen(process.env.PORT, () => {
//   console.log(`Server running on port ${process.env.PORT}`);
// });

// ✅ Export for Vercel serverless
export default app;
