export function globalErrorHandler(err, req, res, next) {
  let status = err.statusCode || 500;
  let message = err.message || "Internal server error";
  if (err.code == 11000) {
    const field = Object.keys(err.keyValue)[0];
    status = 409;
    message: `${field} already registered`;
  }
  if (req.originalUrl.includes("api/auth/google/callback")) {
    return res.redirect(
      `http://localhost:5173/login?error=${encodeURIComponent(message)}`,
    );
  }

  res.status(status).json({
    success: false,
    message,
  });
}
