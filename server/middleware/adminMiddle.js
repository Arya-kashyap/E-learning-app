import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();
const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD;

/**
 * Middleware to authenticate admin via JWT.
 * Verifies token and attaches `adminId` to `req` if valid.
 * Designed for serverless environments like Vercel.
 */
const adminMiddleware = (req, res, next) => {
  // 🔐 Extract Authorization header
  const authHeader = req.headers.authorization;

  // ✅ Check if header exists and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ errors: "No token provided in Authorization header" });
  }

  // 🎯 Extract token from "Bearer <token>"
  const token = authHeader.split(" ")[1];

  // ✅ Check if token is non-empty
  if (!token || token.trim() === "") {
    return res.status(401).json({ errors: "Token is missing or malformed" });
  }

  try {
    // 🧠 Verify token using admin secret
    const decoded = jwt.verify(token, JWT_ADMIN_PASSWORD);

    // ✅ Ensure decoded payload contains admin ID
    if (!decoded?.id) {
      return res.status(403).json({ errors: "Token payload missing admin ID" });
    }

    // 🧾 Attach admin ID to request object for downstream use
    req.adminId = decoded.id;

    // 🚀 Proceed to next middleware or route
    next();
  } catch (error) {
    // ❌ Token verification failed
    console.error("JWT verification failed:", error.message);
    return res.status(401).json({ errors: "Invalid or expired token" });
  }
};

export default adminMiddleware;
