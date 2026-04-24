import { Router } from "express";
import {
  authenticateSeller,
  authUser,
} from "../middlewares/auth.middleware.js";
import {
  createProductController,
  getSellerProducts,
} from "../controllers/product.controller.js";
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
  authenticateSeller,
  upload.array("images", 7),
  validateImages,
  createProductValidator,
  createProductController,
);
productRouter.get("/seller", authUser, authenticateSeller, getSellerProducts);
export default productRouter;
