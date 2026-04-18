import { Router } from "express";
import {
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

export default authRouter;
