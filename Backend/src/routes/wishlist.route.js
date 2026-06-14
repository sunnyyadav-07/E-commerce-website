import { Router } from "express";
import { addToWishList } from "../controllers/wishlist.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";
import { wishListValidator } from "../validators/wishlist.validator.js";
const wishListRouter = Router();
wishListRouter.post("/add", authUser, wishListValidator, addToWishList);
export default wishListRouter;
