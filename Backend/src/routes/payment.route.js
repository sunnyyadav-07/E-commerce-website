import { Router } from "express";
import { authorizeRole, authUser } from "../middlewares/auth.middleware.js";
import {
  createRazorpayOrderController,
  verifyPaymentController,
} from "../controllers/payment.controller.js";
const paymentRouter = Router();
paymentRouter.post(
  "/create-order",
  authUser,
  authorizeRole("buyer"),
  createRazorpayOrderController,
);
paymentRouter.post(
  "/verify",
  authUser,
  authorizeRole("buyer"),
  verifyPaymentController,
);

export default paymentRouter;
