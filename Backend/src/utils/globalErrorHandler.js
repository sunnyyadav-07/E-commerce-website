export function globalErrorHandler(err, req, res, next) {
  if (err.code == 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      success: false,
      message: `${field} already exists`,
    });
  }
  const status = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(status).json({
    success: false,
    message,
  });
}
