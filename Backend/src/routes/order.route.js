import { Router } from "express";
import { orderValidator } from "../validators/order.validator.js";
import {
  getMyOrderController,
  getSellerOrdersController,
  markOrderAsSeenController,
  orderDetailsController,
  updateProductStatusContoller,
} from "../controllers/order.controller.js";
import { authorizeRole, authUser } from "../middlewares/auth.middleware.js";

const orderRouter = Router();
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
orderRouter.patch(
  "/",
  authUser,
  authorizeRole("seller"),
  updateProductStatusContoller,
);
orderRouter.get(
  "/:orderId",
  authUser,
  authorizeRole("buyer"),
  orderDetailsController,
);
orderRouter.get(
  "/",
  authUser,
  authorizeRole("buyer"),
  getMyOrderController,
);
export default orderRouter;
