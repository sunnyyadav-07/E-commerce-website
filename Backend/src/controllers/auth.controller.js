import userModel from "../models/user.model.js";
import { config } from "../config/config.js";
import jwt from "jsonwebtoken";
async function sendTokenRequence(user, res, message) {
  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    config.JWT_SECRET,
    { expiresIn: "7d" },
  );
  res.cookie("token", token);
  res.status(200).json({
    success: true,
    message,
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
      //  Google conflict case
      if (existingUser.authProvider === "google") {
        return res.status(400).json({
          success: false,
          message:
            "Account already exists with Google. Please continue with Google.",
          provider: "google",
        });
      }

      return res.status(400).json({
        success: false,
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
    //  Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email or contact already exists",
      });
    }

    return res.status(500).json({
      success: false,
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
  // if user login with google
  if (user.authProvider === "google") {
    return res.status(400).json({
      success: false,
      message:
        "This account was created with Google. Please continue with Google.",
      provider: "google",
    });
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return res.status(400).json({
      success: false,
      message: "Invalid credentials",
    });
  }
  sendTokenRequence(user, res, "Login successfully");
}

export async function googleCallback(req, res) {
  try {
    const { emails, photos, displayName, id } = req.user;
    const email = emails[0].value;
    const profilePic = photos[0].value;
    let user = await userModel.findOne({
      $or: [{ email }, { googleId: id }],
    });
    if (!user) {
      user = await userModel.create({
        email,
        googleId: id,
        fullname: displayName,
        authProvider: "google",
        role: null,
      });
    }
    if (user && !user.googleId) {
      // link Google account
      user.googleId = id;
      user.authProvider = "google";
      await user.save();
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      config.JWT_SECRET,
      { expiresIn: "7d" },
    );
    res.cookie("token", token);
    if (!user.role) {
      return res.redirect("http://localhost:5173/select-role");
    } else {
      return res.redirect("http://localhost:5173/");
    }
  } catch (error) {
    console.log(error);
    return res.redirect("http://localhost:5173/login");
  }
}

export async function setUserRoleController(req, res) {
  try {
    const { role } = req.body;
    const userId = req.user._id;
    if (!["buyer", "seller"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (user.role) {
      return res.status(400).json({
        success: false,
        message: "Role already selected",
      });
    }
    user.role = role;
    await user.save();
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      config.JWT_SECRET,
      { expiresIn: "7d" },
    );
    res.cookie("token", token);
    res.status(200).json({
      success: true,
      message: "Role updated successfully",
      role: user.role,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

export function getMeController(req, res) {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "User fetched successfully",
    user: {
      id: user._id,
      email: user.email,
      fullname: user.fullname,
      role: user.role,
    },
  });
}
