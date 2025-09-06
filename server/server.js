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

const app = express();
dotenv.config();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

await connectDB();

// Routes
app.use("/api/course", courseRoute);
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/order", orderRoute);

// // Optional: Local dev server
// if (process.env.NODE_ENV !== 'production') {
//   const PORT = process.env.PORT || 4000;
//   app.listen(PORT, () => {
//     console.log(`🚀 Server running locally at http://localhost:${PORT}`);
//   });
// }

export default app;
