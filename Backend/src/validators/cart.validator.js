import { body } from "express-validator";
import { validateRequest } from "./validateRequest.js";
export const productIdValidator = [
  body("productId")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Invalid product ID"),
];
export const variantIdValidator = [
  body("variantId")
    .notEmpty()
    .withMessage("Variant ID is required")
    .isMongoId()
    .withMessage("Invalid variant ID"),
];
export const addToCartValidator = [
  productIdValidator,
  variantIdValidator,
  body("quantity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),
  validateRequest,
];
