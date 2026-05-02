import productModel from "../models/product.model.js";
import userModel from "../models/user.model.js";
import { uploadFiles } from "../services/storage.service.js";

export async function createProductController(req, res) {
  try {
    const productId = req.params;
    const sellerId = req.user._id;
    const { attributes, stock, priceAmount, priceCurrency, sku } = req.body;
    const product = await productModel.findOne({
      _id: productId,
      sellerId,
    });
    if (!product) {
      return res.status(404).json({
        success: false,
        message:
          "Product not found or you are not authorized to add variants to this product",
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
    // const product = await productModel.create({
    //   title,
    //   description,
    //   price: { amount: priceAmount, currency: priceCurrency || "INR" },
    //   images,
    //   sellerId: req.user._id,
    // });
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

export async function getSellerProducts(req, res) {
  const sellerId = req.user._id;
  const products = await productModel.find({
    sellerId,
  });
  if (!products) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
  res.status(200).json({
    success: true,
    message: "Products fetched successfully",
    products,
  });
}
export async function getAllProductsController(req, res) {
  const products = await productModel.find();
  if (!products) {
    return res.status(404).json({
      success: false,
      message: "Do not have products",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Products fetched successfully",
    products,
  });
}

export async function getProductDetailsController(req, res) {
  const { productId } = req.params;
  if (!productId) {
    return res.status(400).json({
      success: false,
      message: "Product id not found",
    });
  }
  const product = await productModel.findById(productId);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
  return res.status(200).json({
    success: true,
    message: "Product details fetched successfully",
    product,
  });
}

export async function createParentProductController(req, res) {
  try {
    const { title, description, brand, category, subCategory } = req.body;
    const sellerId = req.user._id;
    const isProductExists = await productModel.findOne({
      title,
      brand,
      category,
      subCategory,
      sellerId,
    });
    if (isProductExists) {
      return res.status(400).json({
        success: false,
        message: "This product already exists, try adding variants.",
      });
    }
    const product = await productModel.create({
      title,
      description,
      brand,
      category,
      subCategory,
      sellerId
    });
    res.status(201).json({
      success: true,
      message: "Parent product created successfully",
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
