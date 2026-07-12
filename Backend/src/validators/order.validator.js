import { body } from "express-validator";
import { validateRequest } from "./validateRequest";
const orderValidator = [
  body("items")
    .isArray({ min: 1 })
    .withMessage("Items must be a non-empty array"),
  body("items.*.product")
    .notEmpty()
    .withMessage("Product ID is required")
    .isMongoId()
    .withMessage("Invalid product ID"),
  body("items.*.variant")
    .notEmpty()
    .withMessage("Variant ID is required")
    .isMongoId()
    .withMessage("Invalid variant ID"),
  body("items.*.quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1"),
  body("items").custom((items) => {
    const seen = new Set();
    for (const item of items) {
      const key = `${item.product}-${item.variant}`;
      if (seen.has(key)) {
        throw new Error("Duplicate product/variant combination in items");
      }
      seen.add(key);
    }
    return true;
  }),
  validateRequest,
];
