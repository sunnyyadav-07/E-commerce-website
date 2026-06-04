import { Router } from "express";
import { addToCartController } from "../controllers/cart.controller.js";
import { addToCartValidator } from "../validators/cart.validator.js";
import { authUser } from "../middlewares/auth.middleware.js";

const cartRouter = Router();
cartRouter.post("/item", authUser, addToCartValidator, addToCartController);

export default cartRouter;
