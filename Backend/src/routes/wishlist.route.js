import { Router } from "express";
import {
  addToWishList,
  getAllWishListItemsController,
  removeItemFromWishListController,
} from "../controllers/wishlist.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
import { wishListValidator } from "../validators/wishlist.validator.js";
const wishListRouter = Router();
wishListRouter.post("/add", authUser, wishListValidator, addToWishList);
wishListRouter.get("/all-items", authUser, getAllWishListItemsController);
wishListRouter.delete(
  "/item/:productId/:variantId",
  authUser,
  removeItemFromWishListController,
);
export default wishListRouter;
