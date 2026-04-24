import productModel from "../models/product.model.js";
import userModel from "../models/user.model.js";
import { uploadFiles } from "../services/storage.service.js";

export async function createProductController(req, res) {
  try {
    const { title, description, priceAmount, priceCurrency } = req.body;
    const userRole = req.user.role;
    if (userRole !== "seller") {
      return res.status(400).json({
        success: false,
        message: "Unauthorized user",
      });
    }
    const images = await Promise.all(
      req.files.map(async (file) => {
        return await uploadFiles({
          buffer: file.buffer,
          fileName: file.originalname,
        });
      }),
    );
    const product = await productModel.create({
      title,
      description,
      price: { amount: priceAmount, currency: priceCurrency || "INR" },
      images,
      sellerId: req.user.id,
    });
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}
