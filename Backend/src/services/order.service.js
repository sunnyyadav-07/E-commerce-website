import cartModel from "../models/cart.model.js";
import orderModel from "../models/order.model.js";
import productModel from "../models/product.model.js";
import { AppError } from "../utils/appError.js";

export async function calculateOrderAmount(items) {
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

  let totalAmount = 0;
  const orderedItems = [];
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
  }

  return { totalAmount, orderedItems };
}
export async function confirmOrderAfterPayment(paymentDocument, session) {
  const order = await orderModel
    .findById(paymentDocument.order)
    .session(session);
  if (!order) {
    throw new AppError("Order not found", 404);
  }
  const bulkOps = order.items.map((item) => ({
    updateOne: {
      filter: {
        _id: item.product,
        "variants._id": item.variant,
        "variants.stock": { $gte: item.quantity },
      },
      update: { $inc: { "variants.$.stock": -item.quantity } },
    },
  }));
  const bulkResult = await productModel.bulkWrite(bulkOps, { session });
  if (bulkResult.modifiedCount !== order.items.length) {
    throw new AppError("Stock changed, please try again", 409);
  }
  order.orderStatus = "placed";
  await order.save({ session });
  const orderedProductIds = order.items.map((item) => item.product);
  const orderedVariantIds = order.items.map((item) => item.variant);
  await cartModel.updateOne(
    {
      userId: paymentDocument.user,
    },
    {
      $pull: {
        items: {
          productId: { $in: orderedProductIds },
          variantId: { $in: orderedVariantIds },
        },
      },
    },
    { session },
  );
  return order;
}
