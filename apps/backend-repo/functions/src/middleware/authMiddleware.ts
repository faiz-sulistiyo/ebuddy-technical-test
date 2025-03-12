import {Request, Response, NextFunction} from "express";
import admin from "firebase-admin";

/**
 * Middleware to validate Firebase Authentication token
 */
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];

    if (!token) {
      res.status(401).json({message: "Unauthorized: No token provided"});
      return;
    }

    // Verify token with Firebase
    const decodedToken = await admin.auth().verifyIdToken(token);

    // Attach user data to request object
    (req as any).user = decodedToken;

    next();
  } catch (error) {
    res
      .status(403)
      .json({message: "Forbidden: Invalid or expired token", error});
    return;
  }
};
