import { body, validationResult } from "express-validator";

function validateRequest(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  next();
}
const emailValidator = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
];
const passwordValidator = [
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];
export const validateRegisterUser = [
  emailValidator,
  passwordValidator,
  body("contact")
    .trim()
    .notEmpty()
    .withMessage("Contact is required")
    .matches(/^[0-9]{10}$/)
    .withMessage("Contact must be 10-digit number"),
  body("fullname")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 5, max: 50 })
    .withMessage("Name must be 5-50 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Name can only contain letters and spaces"),
  body("isSeller").isBoolean().withMessage("isSeller must be a boolean value"),
  validateRequest,
];

export const loginValidator = [
  emailValidator,
  passwordValidator,
  validateRequest,
];
