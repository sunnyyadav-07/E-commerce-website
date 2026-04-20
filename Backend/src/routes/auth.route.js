import { Router } from "express";
import passport from "passport";
import {
  googleCallback,
  loginController,
  registerController,
} from "../controllers/auth.controller.js";
import {
  loginValidator,
  validateRegisterUser,
} from "../validators/auth.validator.js";

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
    failureRedirect: "/login",
  }),
  googleCallback,
);

export default authRouter;
