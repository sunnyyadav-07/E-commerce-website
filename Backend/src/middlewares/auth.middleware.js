import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import userModel from "../models/user.model.js";

export async function authUser(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json({
      message: "Unauthorized",
      success: false,
      err: "No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists",
      });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({
      message: "Unauthorized",
      success: false,
      err: "Invalid token",
    });
  }
}

export function authenticateSeller(req, res, next) {
  const userRole = req.user.role;
  console.log(userRole);
  if (userRole !== "seller") {
    return res.status(400).json({
      success: false,
      message: "Unauthorized user",
    });
  }
  next();
}
