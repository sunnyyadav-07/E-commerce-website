import { Router } from "express";
import {
  authenticateSeller,
  authUser,
} from "../middlewares/auth.middleware.js";
import {
  createParentProductController,
  createProductVariantController,
  getAllProductsController,
  getProductDetailsController,
  getSellerProducts,
  updateSellerProductController,
} from "../controllers/product.controller.js";
import multer from "multer";
import {
  createProductVariantValidator,
  parentProductValidator,
} from "../validators/product.validator.js";
import { validateImages } from "../middlewares/custom.middleware.js";
import { updateProductValidator } from "../validators/updateProducts.validator.js";
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});
const productRouter = Router();
productRouter.post(
  "/create",
  authUser,
  authenticateSeller,
  parentProductValidator,
  createParentProductController,
);
productRouter.post(
  "/:productId/variant",
  authUser,
  authenticateSeller,
  upload.array("images", 7),
  validateImages,
  createProductVariantValidator,
  createProductVariantController,
);
productRouter.get("/seller", authUser, authenticateSeller, getSellerProducts);
productRouter.get("/", getAllProductsController);
productRouter.get("/detail/:productId", getProductDetailsController);
productRouter.patch(
  "/:productId/:variantId",
  authUser,
  authenticateSeller,
  updateProductValidator,
  updateSellerProductController,
);
export default productRouter;
