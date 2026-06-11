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

    const userCartProducts = await cartModel
      .findOne({
        userId,
      })
      .populate("items.productId");
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
