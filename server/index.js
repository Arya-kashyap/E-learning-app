import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import courseRoute from './routes/courseRoute.js';
import userRoute from './routes/userRoute.js'
import adminRoute from './routes/adminRoute.js'
import fileUpload from 'express-fileupload'
import cookieParser from 'cookie-parser'
import cors from 'cors'
// import {v2 as cloudinary} from 'cloudinary'

const app = express();
dotenv.config();

//middleware
app.use(express.json());
app.use(cookieParser())
// app.use(fileUpload({
//     useTempFiles : true,
//     tempFileDir : '/tmp/'
// }));

app.use(cors({
     origin: process.env.FRONTEND_URL,
     credentials: true,
     methods: ["GET", "POST", "PUT", "DELETE"],
     allowedHeaders: ["Content-Type", "Authorization"],
}))

const port = process.env.PORT || 3000;
const mongodb_url = process.env.MONGODB_URL;

try {
     await mongoose.connect(mongodb_url);
     console.log("MongoDB Conected")
} catch (error) {
     console.log(error)
}

//Routes
app.use("/api/course", courseRoute);
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);

//cloudinary configure setup
// cloudinary.config({
//      cloud_name: process.env.cloud_name,
//      api_key: process.env.api_key,
//      api_secret: process.env.api_secret,
// })


app.listen(port, () => { console.log(`server started on port ${port}`) });