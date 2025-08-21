import jwt from 'jsonwebtoken';
import { JWT_ADMIN_PASSWORD } from '../config.js';

function adminMiddleware(req, res, next) {
     const authHeader = req.headers.authorization;
     if (!authHeader || !authHeader.startsWith("Bearer ")) {
          return res.status(401).json({ error: "No token provided" });
     }
     
     const token = authHeader.split(" ")[1];
     try {
          const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD)
          req.adminId = decoded.id
          next();
     } catch (error) {
          return res.status(400).json({ error: "Invalid token or expired" })
          console.log("Invalid token or expired");
     }
}
export default adminMiddleware;