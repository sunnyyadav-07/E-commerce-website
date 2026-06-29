import { Router } from "express";
import { authorizeRole, authUser } from "../middlewares/auth.middleware.js";
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
  authorizeRole("seller"),
  parentProductValidator,
  createParentProductController,
);
productRouter.post(
  "/:productId/variant",
  authUser,
  authorizeRole("seller"),
  upload.array("images", 7),
  validateImages,
  createProductVariantValidator,
  createProductVariantController,
);
productRouter.get(
  "/seller",
  authUser,
  authorizeRole("seller"),
  getSellerProducts,
);
productRouter.get("/", getAllProductsController);
productRouter.get("/detail/:productId", getProductDetailsController);
productRouter.patch(
  "/:productId/:variantId",
  authUser,
  authorizeRole("seller"),
  updateProductValidator,
  updateSellerProductController,
);
export default productRouter;
