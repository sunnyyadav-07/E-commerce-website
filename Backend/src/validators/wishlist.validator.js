import { body } from "express-validator";
import { validateRequest } from "./validateRequest.js";
import { productIdValidator, variantIdValidator } from "./cart.validator.js";
export const wishListValidator = [
  productIdValidator,
  variantIdValidator,
  validateRequest,
];
