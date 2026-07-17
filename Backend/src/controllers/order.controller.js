import mongoose from "mongoose";
import orderModel from "../models/order.model.js";
import productModel from "../models/product.model.js";
import { AppError } from "../utils/appError.js";

export async function createOrderController(req, res, next) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const userId = req.user._id;
    const { items } = req.body;
    const productIds = items.map((item) => item.productId);
    const products = await productModel
      .find(
        { _id: { $in: productIds } },
        {
          searchTerms: 0,
        },
      )
      .lean();
    const productMap = new Map(products.map((p) => [p._id.toString(), p]));
    const orderedItems = [];
    let totalAmount = 0;
    const bulkOps = [];
    for (const item of items) {
      const product = productMap.get(item.productId);
      if (!product) {
        throw new AppError("Product not found", 404);
      }
      let variant = product.variants.find(
        (v) => v._id.toString() === item.variantId,
      );
      if (!variant) {
        throw new AppError(
          "This variant of product not found " + item.variantId,
          404,
        );
      }
      if (variant.stock < item.quantity) {
        throw new AppError(
          `${product.title} has only ${variant.stock} left`,
          400,
        );
      }
      totalAmount += variant.price.amount * item.quantity;
      orderedItems.push({
        product: product._id,
        variant: variant._id,
        price: variant.price.amount,
        quantity: item.quantity,
        seller: product.sellerId,
      });
      bulkOps.push({
        updateOne: {
          filter: {
            _id: product._id,
            "variants._id": variant._id,
            "variants.stock": { $gte: item.quantity },
          },
          update: { $inc: { "variants.$.stock": -item.quantity } },
        },
      });
    }
    const bulkResult = await productModel.bulkWrite(bulkOps, { session });
    if (bulkResult.modifiedCount !== items.length) {
      // Race condition case — kisi ne beech mein order place kar diya, stock change ho gaya
      throw new AppError("Stock changed, please try again", 409);
    }
    const order = await orderModel.create(
      [
        {
          user: req.user._id,
          items: orderedItems,
          totalAmount,
          orderStatus: "placed",
        },
      ],
      { session },
    );
    await session.commitTransaction();
    res.status(201).json({
      success: true,
      message: "Order placed successfully",
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
}

async function getSellerOrdersByStatus(sellerId, status, isSeen = false) {
  const orders = await orderModel
    .find({
      items: {
        $elemMatch: {
          "items.seller": sellerId,
          "tems.isSeenBySieller": isSeen,
          "items.itemStatus": status,
        },
      },
    })
    .lean();

  return orders;
}

export async function getSellerOrdersController(req, res, next) {
  try {
    const sellerId = req.user._id;
    const { status, isSeen } = req.query;
    if (!sellerId) {
      throw new AppError("Need seller id to process request", 400);
    }
    const validStatuses = [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];
    if (!status || !validStatuses.includes(status)) {
      throw new AppError("Invalid or missing status", 400);
    }
    const seenFlag = isSeen === "true";
    const orders = await getSellerOrdersByStatus(sellerId, status, seenFlag);
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    next(error);
  }
}
