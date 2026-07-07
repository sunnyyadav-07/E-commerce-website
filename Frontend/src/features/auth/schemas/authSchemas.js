import { z } from "zod";

/* ─────────────────────────────────────────────
   Shared field rules (reused across schemas)
───────────────────────────────────────────── */
const emailField = z
  .string()
  .min(1, "Email is required")
  .email("Please enter a valid email address");

const passwordField = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Must contain at least one uppercase letter")
  .regex(/[0-9]/, "Must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Must contain at least one special character");

/* ─────────────────────────────────────────────
   Login
───────────────────────────────────────────── */
export const loginSchema = z.object({
  email: emailField,
  password: z.string().min(8, "Password must be at least 8 characters"),
});

/* ─────────────────────────────────────────────
   Register
───────────────────────────────────────────── */
export const registerSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters"),
  email: emailField,
  contact: z
    .string()
    .min(1, "Contact number is required")
    .regex(/^\+?[\d\s\-().]{7,15}$/, "Please enter a valid contact number"),
  password: passwordField,
  isSeller: z.boolean().optional().default(false),
});

/* ─────────────────────────────────────────────
   Forgot Password
───────────────────────────────────────────── */
export const forgotPasswordSchema = z.object({
  email: emailField,
});

/* ─────────────────────────────────────────────
   Reset Password
───────────────────────────────────────────── */
export const resetPasswordSchema = z
  .object({
    newPassword: passwordField,
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
