import { Router } from "express";
import { orderValidator } from "../validators/order.validator.js";
import { createOrderController } from "../controllers/order.controller.js";
import { authorizeRole, authUser } from "../middlewares/auth.middleware.js";

const orderRouter = Router();
orderRouter.post(
  "/",
  authUser,
  authorizeRole("buyer"),
  orderValidator,
  createOrderController,
);
export default orderRouter;
