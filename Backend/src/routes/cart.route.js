import { Router } from "express";
import {
  addToCartController,
  getAllCartProducts,
  removeProductFromCartController,
  updateQuantityOfProductController,
} from "../controllers/cart.controller.js";
import { addToCartValidator } from "../validators/cart.validator.js";
import { authorizeRole, authUser } from "../middlewares/auth.middleware.js";

const cartRouter = Router();
cartRouter.post(
  "/add-to-cart/item",
  authUser,
  authorizeRole("buyer"),
  addToCartValidator,
  addToCartController,
);
cartRouter.get(
  "/added/items",
  authUser,
  authorizeRole("buyer"),
  getAllCartProducts,
);
cartRouter.patch(
  "/update-quantity/:productId/:variantId",
  authUser,
  authorizeRole("buyer"),
  updateQuantityOfProductController,
);
cartRouter.delete(
  "/item/:productId/:variantId",
  authUser,
  authorizeRole("buyer"),
  removeProductFromCartController,
);

export default cartRouter;
