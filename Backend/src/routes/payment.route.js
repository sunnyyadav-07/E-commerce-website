import { Router } from "express";
import { authorizeRole, authUser } from "../middlewares/auth.middleware.js";
import { createRazorpayOrderController } from "../controllers/payment.controller.js";
const paymentRouter = Router();
paymentRouter.post(
  "/create-order",
  authUser,
  authorizeRole("buyer"),
  createRazorpayOrderController,
);

export default paymentRouter;
