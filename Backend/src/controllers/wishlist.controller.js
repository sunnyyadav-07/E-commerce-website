import wishListModel from "../models/wishlist.model.js";

export async function addToWishList(req, res) {
  try {
    const { productId, variantId } = req.body;
    const userId = req.user._id;
    const userWishList = await wishListModel.findOne({
      userId,
    });

    // new user trying to add item in wishlist
    if (!userWishList) {
      const newListItem = await wishListModel.create({
        userId,
        products: [{ productId, variantId }],
      });
      return res.status(201).json({
        success: true,
        message: "Item is added to the wishlist",
        wishList: newListItem,
      });
    }
    const existingWishList = userWishList.products.find(
      (item) =>
        item.productId.equals(productId) && item.variantId.equals(variantId),
    );

    // user has wishlist but not any item in wishlist
    if (!existingWishList) {
      userWishList.products.push({ productId, variantId });
      await userWishList.save();
      return res.status(200).json({
        success: true,
        message: "New Item added successfully in wishlist",
        wishList: userWishList,
      });
    }

    // user already has this item
    return res.status(409).json({
      success: false,
      message: "Already in the wishlist",
      wishList: userWishList,
    });
  } catch (error) {
    console.log("error in add to wishlist API", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
}
