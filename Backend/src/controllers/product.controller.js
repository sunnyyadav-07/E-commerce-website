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

export async function createProductVariantController(req, res, next) {
  try {
    const { productId } = req.params;
    const sellerId = req.user._id;
    const { attributes, stock, priceAmount, priceCurrency } = req.body;
    const product = await productModel.findOne({
      _id: productId,
      sellerId,
    });
    if (!product) {
      throw new AppError(
        "Product not found or you are not authorized to add variants to this product",
        404,
      );
    }
    const variantExists = product.variants.find(
      (variant) =>
        JSON.stringify(Object.fromEntries(variant.attributes)) ===
        JSON.stringify(attributes),
    );
    if (variantExists) {
      throw new AppError("This variant already exists", 409);
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
    next(error);
  }
}

export async function getSellerProducts(req, res, next) {
  try {
    const sellerId = req.user._id;
    const products = await productModel.find({
      sellerId,
    });
    if (!products) {
      throw new AppError("Product not found", 404);
    }

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllProductsController(req, res, next) {
  try {
    const products = await productModel.find();
    if (!products) {
      throw new AppError("Do not have products", 404);
    }
    const activeProducts = products.filter(
      (product) => product.status === "active",
    );
    return res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products: activeProducts,
    });
  } catch (error) {
    next(error);
  }
}

export async function getProductDetailsController(req, res, next) {
  try {
    const { productId } = req.params;
    if (!productId) {
      throw new AppError("Product ID is required", 400);
    }
    const product = await productModel.findById(productId);
    if (!product) {
      throw new AppError("Product not found", 404);
    }
    return res.status(200).json({
      success: true,
      message: "Product details fetched successfully",
      product,
    });
  } catch (error) {
    next(error);
  }
}

export async function createParentProductController(req, res, next) {
  try {
    const { title, description, brand, category, gender, productType } =
      req.body;
    const sellerId = req.user._id;
    const isProductExists = await productModel.findOne({
      title,
      brand,
      category,
      sellerId,
      productType,
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
      sellerId,
      productType,
      gender:
        category == "Men's Clothing"
          ? "men"
          : category == "Women's Clothing"
            ? "women"
            : gender,
    });
    res.status(201).json({
      success: true,
      message: "Parent product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function updateSellerProductController(req, res, next) {
  try {
    const { productId, variantId } = req.params;
    const currProductInfo = await productModel.findOne({
      _id: productId,
      sellerId: req.user._id,
    });
    if (!currProductInfo) {
      throw new AppError("Product not found", 404);
    }
    const variantInfo = currProductInfo.variants.find(
      (v) => v._id.toString() === variantId,
    );
    const finalFormattedProduct = {
      title: currProductInfo.title,
      description: currProductInfo.description,
      stock: variantInfo.stock,
      price: variantInfo.price.amount,
      color: variantInfo.attributes.get("color"),
      size: variantInfo.attributes.get("size"),
    };

    const allowedFields = [
      "title",
      "price",
      "stock",
      "color",
      "size",
      "description",
    ];
    const updatedData = {};
    for (const field of allowedFields) {
      if (
        req.body[field] !== undefined &&
        req.body[field] !== finalFormattedProduct[field]
      ) {
        updatedData[field] = req.body[field];
      }
    }
    if (Object.keys(updatedData).length === 0) {
      throw new AppError("No changes detected", 400);
    }
    for (const [field, value] of Object.entries(updatedData)) {
      switch (field) {
        case "title":
          currProductInfo.title = value;
          break;

        case "description":
          currProductInfo.description = value;
          break;

        case "stock":
          variantInfo.stock = value;
          break;

        case "price":
          variantInfo.price.amount = value;
          break;

        case "color":
          variantInfo.attributes.set("color", value);
          break;

        case "size":
          variantInfo.attributes.set("size", value);
          break;
      }
    }

    await currProductInfo.save();
    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      updatedData,
    });
  } catch (error) {
    next(error);
  }
}
