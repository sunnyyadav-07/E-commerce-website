import userModel from "../models/user.model.js";
import { config } from "../config/config.js";
import jwt from "jsonwebtoken";
async function sendTokenRequence(user, res, message) {
  const token = jwt.sign(
    {
      id: user._id,
    },
    config.JWT_SECRET,
    { expiresIn: "7d" },
  );
  res.cookie("token", token);
  res.status(200).json({
    message,
    success: true,
    user: {
      id: user._id,
      email: user.email,
      contact: user.contact,
      fullname: user.fullname,
      role: user.role,
    },
  });
}
export async function registerController(req, res) {
  const { fullname, email, isSeller, password, contact } = req.body;

  try {
    const isUserExists = await userModel.findOne({
      $or: [{ email }, { contact }],
    });
    if (isUserExists) {
      return res.status(400).json({
        message: "User with this email or contact already exists",
      });
    }

    const user = await userModel.create({
      email,
      fullname,
      contact,
      password,
      role: isSeller ? "seller" : "buyer",
    });
    sendTokenRequence(user, res, "User register successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
}

export async function loginController(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "Invalid credentials",
    });
  }
  sendTokenRequence(user, res, "Login successfully");
}
