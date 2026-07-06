import { stockOfProduct } from "../dao/product.dao.js";
import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";
import { AppError } from "../utils/appError.js";
async function hasCart(userId, populate = false) {
  let query = cartModel.findOne({
    userId,
  });
  if (populate) {
    query = query.populate("items.productId");
  }
  const userCart = await query;
  if (!userCart) {
    throw new AppError("Cart not found", 404);
  }

  return userCart;
}

export async function addToCartController(req, res, next) {
  try {
    const userId = req.user._id;
    const { productId, variantId } = req.body;
    const cart = await cartModel.findOne({
      userId,
    });
    const stock = await stockOfProduct(productId, variantId);

    if (!cart) {
      if (stock <= 0) {
        throw new AppError("This product is currently out of stock.", 409);
      }
      const newCart = await cartModel.create({
        userId,
        items: [{ productId, variantId, variant: 1 }],
      });
      return res.status(201).json({
        success: true,
        message: "Added to cart successfully",
        cartItem: { productId, variantId },
      });
    }
    const existingItem = cart.items.find(
      (item) =>
        item.productId.toString() === productId &&
        item.variantId.toString() === variantId,
    );
    if (existingItem) {
      const cartItemnewQuantity = (existingItem.quantity += 1);
      if (cartItemnewQuantity > stock) {
        throw new AppError(
          `Only ${stock} items are left in stock and user already have ${cartItemnewQuantity - 1}`,
          409,
        );
      }
      await cart.save();
      return res.status(200).json({
        success: true,
        message: "Quantity updated successfully",
        cartItem: { productId, variantId },
      });
    }
    if (!existingItem) {
      cart.items.push({
        productId,
        variantId,
        quantity: 1,
      });
      await cart.save();
      return res.status(200).json({
        success: true,
        message: "Product added in cart  successfully",
        cartItem: { productId, variantId },
      });
    }
  } catch (error) {
    console.log("Error in addToCart api", error);
    next(error);
  }
}

export async function getAllCartProducts(req, res, next) {
  try {
    const userId = req.user._id;
    const userCartProducts = await hasCart(userId, true);
    if (userCartProducts.items.length === 0) {
      throw new AppError("Do not have any product in cart", 404);
    }
    const formattedCartItems = userCartProducts.items.map((item) => {
      const variant = item.productId.variants.id(item.variantId);
      return {
        productId: item.productId._id,
        title: item.productId.title,
        brand: item.productId.brand,
        category: item.productId.category,
        subCategory: item.productId.subCategory,
        description: item.productId.description,
        price: variant.price.amount,
        currency: variant.price.currency,
        images: variant.images,
        stock: variant.stock,
        attributes: variant.attributes,
        variantId: variant._id,
        quantity: item.quantity,
      };
    });
    return res.status(200).json({
      success: true,
      message: "Cart products fetched successfully",
      products: formattedCartItems,
    });
  } catch (error) {
    console.log("Error in get all cart products api", error);
    next(error);
  }
}

export async function updateQuantityOfProductController(req, res, next) {
  try {
    const { productId, variantId } = req.params;
    const { quantity } = req.body;
    if (!quantity || !productId || !variantId) {
      throw new AppError("fields are required to update quantity", 400);
    }
    const userId = req.user._id;
    const userCart = await hasCart(userId);
    const item = userCart.items.find(
      (item) =>
        item.productId.equals(productId) && item.variantId.equals(variantId),
    );

    if (!item) {
      throw new AppError("Product not found", 404);
    }
    const stock = await stockOfProduct(productId, variantId);
    const newQuantity = item.quantity + quantity;
    if (newQuantity > stock) {
      throw new AppError("Maximum available quantity reached.", 409);
    }
    if (newQuantity < 1) {
      throw new AppError("Quantity can not be less than 1", 400);
    }
    item.quantity += quantity;
    await userCart.save();
    return res.status(200).json({
      success: true,
      message: "Product quantity updated successfully",
      quantity: newQuantity,
    });
  } catch (error) {
    console.log("Error in quantity increment API", error);
    next(error);
  }
}

export async function removeProductFromCartController(req, res, next) {
  try {
    const { productId, variantId } = req.params;
    if (!productId || !variantId) {
      throw new AppError("fields are required to update quantity", 400);
    }
    const userId = req.user._id;
    const userCart = await hasCart(userId);
    const productToBeDeleted = userCart.items.find(
      (item) =>
        item.productId.equals(productId) && item.variantId.equals(variantId),
    );
    if (!productToBeDeleted) {
      throw new AppError("Product do not found in cart.", 404);
    }
    productToBeDeleted.deleteOne();

    await userCart.save();
    return res.status(200).json({
      success: true,
      message: "Product deletd from cart successfully",
      products: userCart,
    });
  } catch (error) {
    console.log("Error in remove product from cart API", error);
    next(error);
  }
}
