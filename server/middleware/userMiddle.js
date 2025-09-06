import jwt from 'jsonwebtoken';
import { JWT_USER_PASSWORD } from '../config.js';
import { connectDB } from '../utils/dbConnect.js';

const userMiddleware = async (req, res, next) => {
     const authHeader = req.headers.authorization;

     if (!authHeader || !authHeader.startsWith("Bearer ")) {
          return res.status(401).json({ error: "No token provided" });
     }
     
     const token = authHeader.split(" ")[1];
     try {
          await connectDB();
          const decoded = jwt.verify(token, JWT_USER_PASSWORD)
          req.userId = decoded.id
          next();
     } catch (error) {
          return res.status(400).json({ error: "Invalid token or expired" })
          console.log("Invalid token or expired");

     }
}
export default userMiddleware;