export function validateImages(req, res, next) {
  if (!req.files || req.files.length < 2) {
    return res.status(400).json({
      success: false,
      message: "Minimum 2 images are required",
    });
  }

  if (req.files.length > 7) {
    return res.status(400).json({
      success: false,
      message: "Maximum 7 images are allowed",
    });
  }

  next();
}
