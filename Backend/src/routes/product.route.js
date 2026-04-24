import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import { createProductController } from "../controllers/product.controller.js";
import multer from "multer";
import { createProductValidator } from "../validators/product.validator.js";
import { validateImages } from "../middlewares/custom.middleware.js";
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});
const productRouter = Router();
productRouter.post(
  "/",
  authUser,
  upload.array("images", 7),
  validateImages,
  createProductValidator,
  createProductController,
);

export default productRouter;
