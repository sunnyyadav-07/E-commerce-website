import productModel from "../models/product.model.js";
import userModel from "../models/user.model.js";
import { uploadFiles } from "../services/storage.service.js";
import { nanoid } from "nanoid";

function generateSKU(title, brand, attributes) {
  const brandPart = brand.replace(/\s+/g, "").toUpperCase();

  const titlePart = title.replace(/\s+/g, "").toUpperCase().slice(0, 8);

  const attrPart = Object.values(attributes)
    .join("-")
    .replace(/\s+/g, "")
    .toUpperCase();

  const uniquePart = nanoid(5).toUpperCase();

  return `${brandPart}-${titlePart}-${attrPart}-${uniquePart}`;
}

export async function createProductVariantController(req, res) {
  try {
    const { productId } = req.params;
    const sellerId = req.user._id;
    const { attributes, stock, priceAmount, priceCurrency } = req.body;
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
    const variantExists = product.variants.find(
      (variant) =>
        JSON.stringify(Object.fromEntries(variant.attributes)) ===
        JSON.stringify(attributes),
    );
    if (variantExists) {
      return res.status(400).json({
        success: false,
        message: "This variant already exists",
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
    const parsedAttributes = JSON.parse(attributes);
    let isDefault = false;
    if (product.variants.length === 0) {
      isDefault = true;
    }
    const sku = generateSKU(product.title, product.brand, parsedAttributes);
    product.variants.push({
      sku,
      images,
      stock,
      price: { amount: priceAmount, currency: priceCurrency || "INR" },
      attributes: parsedAttributes,
      isDefault,
    });
    product.status = "active";
    await product.save();

    res.status(201).json({
      success: true,
      message: "Variant created successfully",
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
  const activeProducts = products.filter(
    (product) => product.status === "active",
  );
  return res.status(200).json({
    success: true,
    message: "Products fetched successfully",
    products: activeProducts,
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
        message:
          isProductExists.status === "draft"
            ? "Draft product exists. Please add first variant."
            : "Product already exists. Add another variant.",
        product: isProductExists,
      });
    }

    const product = await productModel.create({
      title,
      description,
      brand,
      category,
      subCategory,
      sellerId,
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

export async function updateSellerProductController(req, res) {
  const { title, price, stock, color, size, description } = req.body;
  const { productId, variantId } = req.params;
  const currProductInfo = await productModel.findOne({
    _id: productId,
    sellerId: req.user._id,
  });
  
}
