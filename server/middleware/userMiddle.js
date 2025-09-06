import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();
const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD;

/**
 * Middleware to authenticate user via JWT token.
 * Attaches `userId` to `req` if token is valid.
 */
const userMiddleware = async (req, res, next) => {
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
    // 🧠 Decode and verify token using secret
    const decoded = jwt.verify(token, JWT_USER_PASSWORD);

    // ✅ Check if decoded payload contains user ID
    if (!decoded?.id) {
      return res.status(403).json({ errors: "Token payload missing user ID" });
    }

    // 🧾 Attach user ID to request object for downstream use
    req.userId = decoded.id;

    // 🚀 Proceed to next middleware or route
    next();
  } catch (error) {
    // ❌ Token verification failed
    console.error("JWT verification failed:", error.message);
    return res.status(401).json({ errors: "Invalid or expired token" });
  }
};

export default userMiddleware;
