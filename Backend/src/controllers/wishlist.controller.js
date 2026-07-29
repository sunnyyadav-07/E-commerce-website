import wishListModel from "../models/wishlist.model.js";
import { AppError } from "../utils/appError.js";
async function getUserWishList(userId, populate = false) {
  let query = wishListModel.findOne({
    userId,
  });
  if (populate) {
    query = query.populate("products.productId");
  }
  const userWishList = await query;
  if (!userWishList) {
    throw new AppError("Wishlist not found", 404);
  }

  return userWishList;
}

export async function addToWishList(req, res, next) {
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

    throw new AppError("Already in the wishlist", 409);
  } catch (error) {
    console.log("error in add to wishlist API", error);
    next(error);
  }
}

export async function getAllWishListItemsController(req, res, next) {
  try {
    const userId = req.user._id;
    const userWishList = await getUserWishList(userId, true);
    if (userWishList.products.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No items in wishlist",
        wishlist: [],
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
    next(error);
  }
}

export async function removeItemFromWishListController(req, res, next) {
  try {
    const { productId, variantId } = req.params;
    const userId = req.user._id;
    if (!variantId || !productId) {
      throw new AppError("Param are required", 400);
    }
    const userWishList = await getUserWishList(userId);
    if (userWishList.products.length === 0) {
      throw new AppError("Do not have any item in wishlist", 404);
    }
    const itemToBeDeleted = userWishList.products.find(
      (item) =>
        item.productId.equals(productId) && item.variantId.equals(variantId),
    );
    if (!itemToBeDeleted) {
      throw new AppError("Item not found in wishlist", 404);
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
    next(error);
  }
}
