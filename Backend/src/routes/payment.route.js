import { Router } from "express";
import { authorizeRole, authUser } from "../middlewares/auth.middleware.js";
import {
  createRazorpayOrderController,
  razorpayWebhookController,
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
paymentRouter.post("/webhook", razorpayWebhookController);
export default paymentRouter;
