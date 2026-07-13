import { Router } from "express";
import { orderValidator } from "../validators/order.validator";
import { createOrderController } from "../controllers/order.controller";
import { authorizeRole, authUser } from "../middlewares/auth.middleware";

const orderRouter = Router();
orderRouter.post(
  "/",
  authUser,
  authorizeRole("buyer"),
  orderValidator,
  createOrderController,
);
export default orderRouter;
