import userModel from "../models/user.model.js";
import { config } from "../config/config.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import blacklistModel from "../models/blackList.model.js";
import redis from "../config/cache.js";
import {
  sendEmail,
  sendPasswordChangedNotification,
} from "../services/mail.service.js";
import bcrypt from "bcryptjs";
import { AppError } from "../utils/appError.js";
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
export async function registerController(req, res, next) {
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

      throw new AppError("User with this email or contact already exists", 409);
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
    console.log("error in register logic");
    next(error);
  }
}

export async function loginController(req, res, next) {
  try {
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
      throw new AppError("Invalid credentials", 400);
    }
    sendTokenRequest(user, res, "Login successfully");
  } catch (error) {
    next(error);
  }
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

export async function setUserRoleController(req, res, next) {
  try {
    const { role } = req.body;
    const user = req.user;
    if (!["buyer", "seller"].includes(role)) {
      throw new AppError("Invalid role", 400);
    }
    if (user.role) {
      throw new AppError("Role already selected", 400);
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
    console.log("error in set user role logic");
    next(error);
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

export async function logoutController(req, res, next) {
  try {
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
  } catch (error) {
    next(error);
  }
}

export async function forgotPasswordController(req, res, next) {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({
      email,
    });
    if (user) {
      const rawToken = crypto.randomBytes(32).toString("hex");
      const hashedToken = crypto
        .createHash("sha256")
        .update(rawToken)
        .digest("hex");
      user.resetPasswordToken = hashedToken;
      user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 min
      await user.save();
      const info = await sendEmail({
        toEmail: "yadavsunny1916@gmail.com",
        rawToken,
      });
    }
    return res.status(200).json({
      success: true,
      message: "If this email exists, a reset link has been sent.",
    });
  } catch (error) {
    console.log("Error in reset password send mail logic", error);
    next(error);
  }
}

export async function resetPasswordController(req, res, next) {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      throw new AppError("Token and new passwors are required", 400);
    }

    if (newPassword.length < 8) {
      throw new AppError("Password must be at least 8 characters long.", 400);
    }
    const userSideHashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await userModel.findOneAndUpdate(
      {
        resetPasswordToken: userSideHashedToken,
        resetPasswordExpires: { $gt: Date.now() },
      },
      {
        password: hashedPassword,
        resetPasswordToken: undefined,
        resetPasswordExpires: undefined,
      },
      { returnDocument: "after" },
    );
    if (!user) {
      throw new AppError(
        "Token is invalid or has expired. Please request a new password reset.",
        400,
      );
    }
    sendPasswordChangedNotification("yadavsunny1916@gmail.com").catch((err) =>
      console.error("Failed to send password change notification:", err),
    );
    return res.status(200).json({
      success: true,
      message: "password has been reset successfully",
    });
  } catch (error) {
    console.log("Error in reset password logic", error);
    next(error);
  }
}

export async function saveUserAddressController(req, res, next) {
  try {
    const { fullname, phone, city, state, pincode, addressLine } = req.body;
    const userId = req.user._id;
    const user = await userModel.findByIdAndUpdate(
      userId,
      {
        $set: {
          address: { fullname, phone, addressLine, state, city, pincode },
        },
      },
      { returnDocument: "after" },
    );
    res.status(200).json({
      success: true,
      message: "Address saved successfully",
      address: user.address,
    });
  } catch (error) {
    console.log("error in save user address logic");
    next(error);
  }
}
