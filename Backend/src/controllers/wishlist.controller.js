import wishListModel from "../models/wishlist.model.js";
async function getUserWishList(userId, populate = false) {
  let query = wishListModel.findOne({
    userId,
  });
  if (populate) {
    query = query.populate("products.productId");
  }
  const userWishList = await query;
  if (!userWishList) {
    throw new Error("Wishlist not found");
  }

  return userWishList;
}

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
        wishlist: newListItem.products,
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
        wishlist: userWishList.products,
      });
    }

    // user already has this item
    return res.status(409).json({
      success: false,
      message: "Already in the wishlist",
      wishlist: userWishList,
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

export async function getAllWishListItemsController(req, res) {
  try {
    const userId = req.user._id;
    const userWishList = await getUserWishList(userId, true);
    if (userWishList.products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Do not have any item in wishlist",
        wishlist: userWishList,
      });
    }
    const formattedWishListItems = userWishList.products.map((item) => {
      const variant = item.productId.variants.id(item.variantId);
      return {
        productId: item.productId._id,
        title: item.productId.title,
        brand: item.productId.brand,
        category: item.productId.category,
        subCategory: item.productId.subCategory,
        price: variant.price.amount,
        image: variant.images[0],
        variantId: variant._id,
      };
    });
    return res.status(200).json({
      success: true,
      message: "Wishlist fetched successfully",
      wishlist: formattedWishListItems,
    });
  } catch (error) {
    console.log("Error in fetching all wishlist items", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
}

export async function removeItemFromWishListController(req, res) {
  try {
    const { productId, variantId } = req.params;
    const userId = req.user._id;
    if (!variantId || !productId) {
      return res.status(400).json({
        success: false,
        message: "Params are required",
      });
    }
    const userWishList = await getUserWishList(userId);
    if (userWishList.products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Do not have any item in wishlist",
        wishlist: userWishList,
      });
    }
    const itemToBeDeleted = userWishList.products.find(
      (item) =>
        item.productId.equals(productId) && item.variantId.equals(variantId),
    );
    if (!itemToBeDeleted) {
      return res.status(404).json({
        success: false,
        message: "Item not found in wishlist",
        wishlist: userWishList,
      });
    }
    itemToBeDeleted.deleteOne();
    await userWishList.save();
    return res.status(200).json({
      success: true,
      message: "Item deleted from wishlist succussfully",
      wishlist: userWishList,
    });
  } catch (error) {
    console.log("Error in removing an item from wishlist", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error,
    });
  }
}
