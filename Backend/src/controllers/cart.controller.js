import { stockOfProduct } from "../dao/product.dao.js";
import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";
async function hasCart(userId, populate = false) {
  let query = cartModel.findOne({
    userId,
  });
  if (populate) {
    query = query.populate("items.productId");
  }
  const userCart = await query;
  if (!userCart) {
    return res.status(404).json({
      success: false,
      message: "Cart not found",
    });
  }
  return userCart;
}

export async function addToCartController(req, res) {
  try {
    const userId = req.user._id;
    const { productId, variantId } = req.body;
    const cart = await cartModel.findOne({
      userId,
    });
    const stock = await stockOfProduct(productId, variantId);

    if (!cart) {
      if (stock <= 0) {
        return res.status(409).json({
          success: false,
          message: "This product is currently out of stock.",
        });
      }
      const newCart = await cartModel.create({
        userId,
        items: [{ productId, variantId, variant: 1 }],
      });
      return res.status(201).json({
        success: true,
        message: "Added to cart successfully",
        newCart,
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
        return res.status(409).json({
          success: false,
          message: `Only ${stock} items are left in stock and user already have ${cartItemnewQuantity - 1}`,
        });
      }
      await cart.save();
      return res.status(200).json({
        success: true,
        message: "Quantity updated successfully",
        cart,
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
        cart,
      });
    }
  } catch (error) {
    console.log("Error in addToCart api", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
}

export async function getAllCartProducts(req, res) {
  try {
    const userId = req.user._id;
    const userCartProducts = await hasCart(userId, true);
    if (!userCartProducts) {
      return res.status(404).json({
        success: false,
        message: "Do not have any product in cart",
      });
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
    res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
}

export async function updateQuantityOfProductController(req, res) {
  try {
    const { productId, variantId } = req.params;
    const { quantity } = req.body;
    if (!quantity || !productId || !variantId) {
      return res.status(400).json({
        success: false,
        message: "fields are required to update quantity",
      });
    }
    const userId = req.user._id;
    const userCart = await hasCart(userId);
    const item = userCart.items.find(
      (item) =>
        item.productId.equals(productId) && item.variantId.equals(variantId),
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    const stock = await stockOfProduct(productId, variantId);
    const newQuantity = item.quantity + quantity;
    if (newQuantity > stock) {
      return res.status(409).json({
        success: false,
        message: "Maximum available quantity reached.",
      });
    }
    if (newQuantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity cannot be less than 1.",
      });
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
    res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
}

export async function removeProductFromCartController(req, res) {
  try {
    const { productId, variantId } = req.params;
    if (!productId || !variantId) {
      return res.status(400).json({
        success: false,
        message: "fields are required to update quantity",
      });
    }
    const userId = req.user._id;
    const userCart = await hasCart(userId);
    const productToBeDeleted = userCart.items.find(
      (item) =>
        item.productId.equals(productId) && item.variantId.equals(variantId),
    );
    if (!productToBeDeleted) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart",
      });
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
    res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
}
