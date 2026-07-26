import { body } from "express-validator";
import { validateRequest } from "./validateRequest.js";

export const validateAddress = [
  body("fullname")
    .trim()
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 8 })
    .withMessage("Full name must be minimum 8 character long"),
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^\+?[\d\s\-().]{7,15}$/)
    .withMessage("Invalid phone number"),
  body("addressLine")
    .trim()
    .notEmpty()
    .withMessage("Address is required")
    .isLength({ min: 10 })
    .withMessage("Please enter a more complete address"),
  body("city")
    .trim()
    .notEmpty()
    .withMessage("City is required")
    .isLength({ min: 3 })
    .withMessage("City name must be at least 3 characters"),
  body("state").trim().notEmpty().withMessage("State is required"),
  body("pincode")
    .trim()
    .notEmpty()
    .withMessage("Pincode is required")
    .matches(/^\d{6}$/)
    .withMessage("Pincode must be exactly 6 digits"),
  validateRequest,
];
