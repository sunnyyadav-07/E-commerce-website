import { Router } from "express";
import { addToCartController } from "../controllers/cart.controller";
import { addToCartValidator } from "../validators/cart.validator";

const cartRouter = Router();
cartRouter.post("/item",addToCartValidator, addToCartController);

export default cartRouter;
