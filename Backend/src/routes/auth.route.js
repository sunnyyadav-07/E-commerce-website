import { Router } from "express";
import passport from "passport";
import {
  forgotPasswordController,
  getMeController,
  googleCallback,
  loginController,
  logoutController,
  registerController,
  resetPasswordController,
  saveUserAddressController,
  setUserRoleController,
} from "../controllers/auth.controller.js";
import {
  loginValidator,
  validateRegisterUser,
} from "../validators/auth.validator.js";
import { authUser } from "../middlewares/auth.middleware.js";
import { validateAddress } from "../validators/address.validator.js";

const authRouter = Router();
authRouter.post("/register", validateRegisterUser, registerController);
authRouter.post("/login", loginValidator, loginController);
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:5173/login",
  }),
  googleCallback,
);
authRouter.patch("/user/role", authUser, setUserRoleController);
authRouter.get("/me", authUser, getMeController);
authRouter.post("/logout", logoutController);
authRouter.post("/forgot-password", forgotPasswordController);
authRouter.post("/reset-password", resetPasswordController);
authRouter.post("/save-address",validateAddress,saveUserAddressController)

export default authRouter;
