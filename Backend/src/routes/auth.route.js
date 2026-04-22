import { Router } from "express";
import passport from "passport";
import {
  googleCallback,
  loginController,
  registerController,
  setUserRoleController,
} from "../controllers/auth.controller.js";
import {
  loginValidator,
  validateRegisterUser,
} from "../validators/auth.validator.js";
import { authUser } from "../middlewares/auth.middleware.js";

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
export default authRouter;
