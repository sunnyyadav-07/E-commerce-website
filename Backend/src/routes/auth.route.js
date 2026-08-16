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
import { authorizeRole, authUser } from "../middlewares/auth.middleware.js";
import { validateAddress } from "../validators/address.validator.js";
import { config } from "../config/config.js";

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
    failureRedirect: `${config.FRONTEND_URL}/login`,
  }),
  googleCallback,
);
authRouter.patch("/user/role", authUser, setUserRoleController);
authRouter.get("/me", authUser, getMeController);
authRouter.post("/logout", logoutController);
authRouter.post("/forgot-password", forgotPasswordController);
authRouter.post("/reset-password", resetPasswordController);
authRouter.post(
  "/save-address",
  authUser,
  authorizeRole("buyer"),
  validateAddress,
  saveUserAddressController,
);

export default authRouter;
