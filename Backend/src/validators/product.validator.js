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
export const createProductValidator = [
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
  body("priceAmount")
    .notEmpty()
    .withMessage("Price amount is required")
    .isNumeric()
    .withMessage("Price amount must be a number"),
  body("priceCurrency")
    .trim()
    .notEmpty()
    .withMessage("Price currency is required")
    .isString()
    .withMessage("Price currency must be a string"),
  validateRequest,
];
