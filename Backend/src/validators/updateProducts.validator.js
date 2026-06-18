import { body } from "express-validator";
import { validateRequest } from "./validateRequest.js";

export const updateProductValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string"),

  body("stock")
    .notEmpty()
    .withMessage("Stock is required")
    .isInt({ min: 0 })
    .withMessage("Stock must be 0 or greater"),

  body("price")
    .notEmpty()
    .withMessage("Price amount is required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be greater than 0"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string"),

  body("color")
    .trim()
    .notEmpty()
    .withMessage("Color is required")
    .isString()
    .withMessage("Color must me string"),

  body("size").trim().withMessage("Size is required"),

  param("productId")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Invalid Product ID"),

  param("variantId")
    .notEmpty()
    .withMessage("Variant ID is required")
    .isMongoId()
    .withMessage("Invalid Variant ID"),
    
  validateRequest,
];
