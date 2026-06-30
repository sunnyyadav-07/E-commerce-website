import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import userModel from "../models/user.model.js";
import blacklistModel from "../models/blackList.model.js";
import crypto from "crypto";
import redis from "../config/cache.js";
export async function authUser(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
      success: false,
      err: "No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const isTokenBlacklisted = await redis.exists(`bl:${tokenHash}`);
    if (isTokenBlacklisted) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
      success: false,
      err: "Invalid token",
    });
  }
}

export function authorizeRole(role) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    if (req.user.role !== role) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    next();
  };
}
