import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";

export async function addToCartController(req, res) {
  try {
    const userId = req.user._id;
    const { productId, variantId } = req.body;
    const cart = await cartModel.findOne({
      userId,
    });
    if (!cart) {
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
      existingItem.quantity += 1;
      await cart.save();
      return res.status(200).json({
        success: true,
        message: "Quantity updated successfully",
        cart,
      });
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
