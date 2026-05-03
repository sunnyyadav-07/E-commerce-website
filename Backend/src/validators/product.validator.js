import { body, validationResult } from "express-validator";

function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validations error",
      errors: errors.array(),
    });
  }
  next();
}
export const createProductVariantValidator = [
  body("priceCurrency")
    .trim()
    .notEmpty()
    .withMessage("Price currency is required")
    .isString()
    .withMessage("Price currency must be a string"),

  body("stock")
    .notEmpty()
    .withMessage("Stock is required")
    .isInt({ min: 0 })
    .withMessage("Stock must be 0 or greater"),

  body("priceAmount")
    .notEmpty()
    .withMessage("Price amount is required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be greater than 0"),

  body("attributes")
    .notEmpty()
    .withMessage("Attributes are required")
    .custom((value) => {
      let parsed;

      try {
        parsed = JSON.parse(value);
      } catch (error) {
        throw new Error("Attributes must be valid JSON");
      }

      if (
        typeof parsed !== "object" ||
        Array.isArray(parsed) ||
        Object.keys(parsed).length === 0
      ) {
        throw new Error("Attributes cannot be empty");
      }

      return true;
    }),
  validateRequest,
];
export const parentProductValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string"),
  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isString()
    .withMessage("Description must be a string"),
  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required")
    .isString()
    .withMessage("Category must be a string"),
  body("brand")
    .trim()
    .notEmpty()
    .withMessage("Brand is required")
    .isString()
    .withMessage("Brand must be a string"),
  validateRequest,
];
