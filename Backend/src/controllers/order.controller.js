import mongoose from "mongoose";
import orderModel from "../models/order.model.js";
import productModel from "../models/product.model.js";
import { AppError } from "../utils/appError.js";
import { calculateOrderAmount } from "../services/order.service.js";

async function getSellerOrdersByStatus(sellerId, status, isSeen = false) {
  const orders = await orderModel.aggregate([
    {
      $match: {
        "items.seller": sellerId,
        "items.itemStatus": status,
        "items.isSeenBySeller": isSeen,
      },
    },
    {
      $project: {
        user: 1,
        createdAt: 1,
        items: {
          $filter: {
            input: "$items",
            as: "item",
            cond: {
              $and: [
                {
                  $eq: ["$$item.seller", sellerId],
                },
                {
                  $eq: ["$$item.itemStatus", status],
                },
                {
                  $eq: ["$$item.isSeenBySeller", isSeen],
                },
              ],
            },
          },
        },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "buyerDetails",
      },
    },
    {
      $unwind: "$buyerDetails",
    },
    {
      $unwind: "$items",
    },
    {
      $lookup: {
        from: "products",
        localField: "items.product",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    {
      $unwind: "$productDetails",
    },
    {
      $addFields: {
        matchedVariant: {
          $filter: {
            input: "$productDetails.variants",
            as: "v",
            cond: {
              $eq: ["$$v._id", "$items.variant"],
            },
          },
        },
      },
    },
    {
      $unwind: "$matchedVariant",
    },
    {
      $project: {
        orderId: "$_id",
        createdAt: 1,
        _id: 0,
        quantity: "$items.quantity",
        price: "$items.price",
        itemId: "$items._id",
        itemStatus: "$items.itemStatus",
        isSeenBySeller: "$items.isSeenBySeller",
        buyerDetails: {
          name: "$buyerDetails.fullname",
          email: "$buyerDetails.email",
        },
        productDetails: {
          productId: "$productDetails._id",
          title: "$productDetails.title",
          brand: "$productDetails.brand",
        },
        variantDetails: {
          variantId: "$matchedVariant._id",
          sku: "$matchedVariant.sku",
          images: "$matchedVariant.images",
          attributes: "$matchedVariant.attributes",
        },
      },
    },
  ]);

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
    // const seenFlag = isSeen === "true";
    const orders = await getSellerOrdersByStatus(sellerId, status);
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.log("error in fetching sellers orders");
    next(error);
  }
}

export async function markOrderAsSeenController(req, res, next) {
  try {
    const sellerId = req.user._id;
    const { orderId, productId } = req.query;
    if (!orderId || !productId) {
      throw new AppError("Order id and product id are missing", 400);
    }
    await orderModel.updateMany(
      {
        items: {
          $elemMatch: {
            seller: sellerId,
            isSeenBySeller: false,
          },
        },
      },
      { $set: { "items.$[elem].isSeenBySeller": true } },
      {
        arrayFilters: [
          { "elem.seller": sellerId, "elem.isSeenBySeller": false },
        ],
      },
    );
    res.status(200).json({
      success: true,
      message: "Marked as seen",
    });
  } catch (error) {
    console.log("Error in marked seen");
    next(error);
  }
}

export async function updateProductStatusContoller(req, res, next) {
  try {
    const sellerId = req.user._id;
    const { itemId, orderId, status } = req.body;
    if (!itemId || !orderId || !status) {
      throw new AppError(
        "To update the order status, product details are needed",
        400,
      );
    }
    const updateFields = {
      "items.$.itemStatus": status,
    };

    const updatedOrder = await orderModel.findOneAndUpdate(
      {
        _id: orderId,
        items: {
          $elemMatch: {
            seller: sellerId,
            _id: itemId,
          },
        },
      },
      {
        $set: updateFields,
        $push: {
          "items.$.statusHistory": {
            status: status,
            changedBy: req.user.role,
          },
        },
      },
      { returnDocument: "after" },
    );
    if (!updatedOrder) {
      throw new AppError("Order or item not found", 404);
    }
    res.status(200).json({
      success: true,
      message: "Product status updated successfully",
      updatedOrder,
    });
  } catch (error) {
    console.log("error in accept order api");
    next(error);
  }
}

export async function orderDetailsController(req, res, next) {
  try {
    const { orderId } = req.params;
    const userId = req.user._id;
    if (!orderId) {
      throw new AppError("Need order id to fetch order details", 400);
    }
    const order = await orderModel.aggregate([
      [
        {
          $match: {
            _id: new mongoose.Types.ObjectId(orderId),
            user: userId,
            orderStatus: "placed",
          },
        },
        {
          $unwind: "$items",
        },
        {
          $lookup: {
            from: "products",
            localField: "items.product",
            foreignField: "_id",
            as: "productDetails",
          },
        },
        {
          $unwind: "$productDetails",
        },
        {
          $addFields: {
            matchedVariant: {
              $filter: {
                input: "$productDetails.variants",
                as: "v",
                cond: {
                  $eq: ["$$v._id", "$items.variant"],
                },
              },
            },
          },
        },
        {
          $unwind: "$matchedVariant",
        },
        {
          $group: {
            _id: "$_id",
            user: {
              $first: "$user",
            },
            totalAmount: {
              $first: "$totalAmount",
            },
            shippingAddress: {
              $first: "$shippingAddress",
            },
            createdAt: {
              $first: "$createdAt",
            },
            items: {
              $push: {
                itemId: "$items._id",
                product: "$productDetails._id",
                variant: "$matchedVariant._id",
                quantity: "$items.quantity",
                images: "$matchedVariant.images",
                price: "$items.price",
                itemStatus: "$items.itemStatus",
                productTitle: "$productDetails.title",
                productBrand: "$productDetails.brand",
                variantSku: "$matchedVariant.sku",
                variantAttributes: "$matchedVariant.attributes",
              },
            },
          },
        },
      ],
    ]);
    if (!order || order.length === 0) {
      throw new AppError("Order not found", 404);
    }
    res.status(200).json({
      success: true,
      message: "Order details fetched successfully",
      order: order[0],
    });
  } catch (error) {
    console.log("error in fetching order details logic");
    next(error);
  }
}

export async function getMyOrderController(req, res, next) {
  try {
    const userId = req.user._id;
    const { status } = req.query;

    const orders = await orderModel.aggregate([
      {
        $match: {
          user: userId,
          orderStatus: "placed",
        },
      },
      {
        $unwind: "$items",
      },
      ...(status ? [{ $match: { "items.itemStatus": status } }] : []),
      {
        $lookup: {
          from: "products",
          localField: "items.product",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails",
      },
      {
        $addFields: {
          matchedVariant: {
            $filter: {
              input: "$productDetails.variants",
              as: "v",
              cond: {
                $eq: ["$$v._id", "$items.variant"],
              },
            },
          },
        },
      },
      {
        $unwind: "$matchedVariant",
      },
      {
        $group: {
          _id: "$_id",
          totalAmount: {
            $first: "$totalAmount",
          },
          createdAt: {
            $first: "$createdAt",
          },
          items: {
            $push: {
              itemId: "$items._id",
              quantity: "$items.quantity",
              itemStatus: "$items.itemStatus",
              product: "$productDetails._id",
              variant: "$matchedVariant._id",
              productTitle: "$productDetails.title",
              thumbnail: {
                $arrayElemAt: ["$matchedVariant.images", 0],
              },
            },
          },
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.log("error in fetching my orders logic");
    next(error);
  }
}
