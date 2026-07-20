import { Router } from "express";
import { orderValidator } from "../validators/order.validator.js";
import {
  createOrderController,
  getSellerOrdersController,
  markOrderAsSeenController,
} from "../controllers/order.controller.js";
import { authorizeRole, authUser } from "../middlewares/auth.middleware.js";

const orderRouter = Router();
orderRouter.post(
  "/",
  authUser,
  authorizeRole("buyer"),
  orderValidator,
  createOrderController,
);
orderRouter.get(
  "/seller",
  authUser,
  authorizeRole("seller"),
  getSellerOrdersController,
);
orderRouter.put(
  "/",
  authUser,
  authorizeRole("seller"),
  markOrderAsSeenController,
);
export default orderRouter;
