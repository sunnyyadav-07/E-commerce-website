import { Router } from "express";
import {
  addToCartController,
  getAllCartProducts,
  removeProductFromCartController,
  updateQuantityOfProductController,
} from "../controllers/cart.controller.js";
import { addToCartValidator } from "../validators/cart.validator.js";
import { authUser } from "../middlewares/auth.middleware.js";

const cartRouter = Router();
cartRouter.post(
  "/add-to-cart/item",
  authUser,
  addToCartValidator,
  addToCartController,
);
cartRouter.get("/added/items", authUser, getAllCartProducts);
cartRouter.patch(
  "/update-quantity/:productId/:variantId",
  authUser,
  updateQuantityOfProductController,
);
cartRouter.delete(
  "/item/:productId/:variantId",
  authUser,
  removeProductFromCartController,
);

export default cartRouter;
