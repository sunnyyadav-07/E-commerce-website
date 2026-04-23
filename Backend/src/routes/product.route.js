import { Router } from "express";
import { authUser } from "../middlewares/auth.middleware.js";
import { createProductController } from "../controllers/product.controller.js";
import multer from "multer";
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
  createProductController,
);

export default productRouter;
