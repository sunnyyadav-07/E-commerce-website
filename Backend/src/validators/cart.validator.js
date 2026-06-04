import { body } from "express-validator";
import { validateRequest } from "./validateRequest.js";

export const addToCartValidator = [
  body("productId")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Invalid product ID"),
  body("variantId")
    .notEmpty()
    .withMessage("Variant ID is required")
    .isMongoId()
    .withMessage("Invalid variant ID"),
  body("quantity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),
  validateRequest,
];
