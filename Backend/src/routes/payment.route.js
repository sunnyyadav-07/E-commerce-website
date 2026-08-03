import { Router } from "express";
import { authorizeRole, authUser } from "../middlewares/auth.middleware.js";
import {
  cancelPaymentController,
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
paymentRouter.patch(
  "/cancel",
  authUser,
  authorizeRole("buyer"),
  cancelPaymentController,
);
export default paymentRouter;
