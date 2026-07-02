import userModel from "../models/user.model.js";
import { config } from "../config/config.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import blacklistModel from "../models/blackList.model.js";
import redis from "../config/cache.js";
import { sendEmail } from "../services/mail.service.js";
async function sendTokenRequest(user, res, message) {
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
      if (isUserExists.authProvider === "google") {
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
    sendTokenRequest(user, res, "User register successfully");
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
  sendTokenRequest(user, res, "Login successfully");
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
    // when user is registered without google and then login with google
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
      console.log("aaya kya role");
      return res.redirect("http://localhost:5173/select-role");
    } else {
      if (user.role == "buyer") {
        return res.redirect("http://localhost:5173/");
      } else {
        return res.redirect("http://localhost:5173/seller/dashboard");
      }
    }
  } catch (error) {
    console.log(error);
    return res.redirect("http://localhost:5173/login");
  }
}

export async function setUserRoleController(req, res) {
  try {
    const { role } = req.body;
    const user = req.user;
    if (!["buyer", "seller"].includes(role)) {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
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
    // const token = jwt.sign(
    //   {
    //     id: user._id,
    //     role: user.role,
    //   },
    //   config.JWT_SECRET,
    //   { expiresIn: "7d" },
    // );
    // res.cookie("token", token);
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

export async function logoutController(req, res) {
  const token = req.cookies.token;

  res.clearCookie("token");
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  const decoded = jwt.verify(token, config.JWT_SECRET);
  const ttl = decoded.exp - Math.floor(Date.now() / 1000);
  if (ttl > 0) {
    await redis.set(`bl:${tokenHash}`, 1, "EX", ttl);
  }
  res.status(200).json({
    success: true,
    message: "Logout successfully",
  });
}
export async function forgotPasswordController(req, res) {
  const { email } = req.body;
  const user = await userModel.findOne({
    email,
  });
  if (user) {
    const rawToken = crypto.randomBytes(32).toString();
    const hashedToken = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 min
    await user.save();
    await sendEmail({ toEmail: "yadavsunny1916@gmail.com", rawToken });
  }
  return res.status(200).json({
    success: true,
    message: "If this email exists, a reset link has been sent.",
  });
}
