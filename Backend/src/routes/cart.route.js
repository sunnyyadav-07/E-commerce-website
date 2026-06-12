import { Router } from "express";
import {
  addToCartController,
  getAllCartProducts,
  updateQuantityOfProductController,
} from "../controllers/cart.controller.js";
import { addToCartValidator } from "../validators/cart.validator.js";
import { authUser } from "../middlewares/auth.middleware.js";

const cartRouter = Router();
cartRouter.post("/item", authUser, addToCartValidator, addToCartController);
cartRouter.get("/added/items", authUser, getAllCartProducts);
cartRouter.patch(
  "/update-quantity/:productId/:variantId",
  authUser,
  updateQuantityOfProductController,
);

export default cartRouter;
