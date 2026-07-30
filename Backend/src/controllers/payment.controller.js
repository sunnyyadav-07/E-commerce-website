import mongoose from "mongoose";
import { config } from "../config/config.js";
import orderModel from "../models/order.model.js";
import paymentModel from "../models/payment.model.js";
import { calculateOrderAmount } from "../services/order.service.js";
import razorpayInstance from "../services/razorpay.service.js";
import { AppError } from "../utils/appError.js";
import {
  validatePaymentVerification,
  validateWebhookSignature,
} from "razorpay/dist/utils/razorpay-utils.js";
import productModel from "../models/product.model.js";
import cartModel from "../models/cart.model.js";

export async function createRazorpayOrderController(req, res, next) {
  try {
    const { items } = req.body;
    const user = req.user;
    const { totalAmount, orderedItems } = await calculateOrderAmount(items);
    const options = {
      amount: totalAmount * 100,
      currency: "INR",
    };
    const order = await orderModel.create({
      user: user._id,
      items: orderedItems,
      totalAmount,
      orderStatus: "pending_payment",
      shippingAddress: user.address,
    });
    const razorpayOrder = await razorpayInstance.orders.create(options);
    const payment = await paymentModel.create({
      user: req.user._id,
      order: order._id,
      price: {
        amount: totalAmount,
        currency: "INR",
      },
      razorpayOrderId: razorpayOrder.id,
    });
    res.status(200).json({
      success: true,
      message: "Razorpay created order successfully",
      order: razorpayOrder,
    });
  } catch (error) {
    console.log("error in razorpay order creation logic");
    next(error);
  }
}

export async function verifyPaymentController(req, res, next) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      items,
    } = req.body;
    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      throw new AppError("Missing payment verification details", 400);
    }
    const isPaymentValid = validatePaymentVerification(
      { order_id: razorpay_order_id, payment_id: razorpay_payment_id },
      razorpay_signature,
      config.RAZORPAY_KEY_SECRET,
    );
    if (!isPaymentValid) {
      await paymentModel.findOneAndUpdate(
        {
          razorpayOrderId: razorpay_order_id,
          user: req.user._id,
          status: { $ne: "paid" },
        },
        { status: "failed" },
      );
      throw new AppError("Payment verification failed", 400);
    }
    const paymentDetails =
      await razorpayInstance.payments.fetch(razorpay_payment_id);

    const payment = await paymentModel.findOneAndUpdate(
      {
        razorpayOrderId: razorpay_order_id,
        user: req.user._id,
        status: { $ne: "paid" },
      },
      {
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        status: "paid",
        method: paymentDetails.method,
      },
      { returnDocument: "after", session },
    );

    if (!payment) {
      throw new AppError("Payment record not found", 404);
    }
    const order = await orderModel.findById(payment.order).session(session);
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
        userId: req.user._id,
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
    await session.commitTransaction();
    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      order,
    });
  } catch (error) {
    await session.abortTransaction();
    console.log("error in payment verification logic");
    next(error);
  } finally {
    session.endSession();
  }
}

export async function razorpayWebhookController(req, res, next) {
  try {
    const webhookSignature = req.headers["x-razorpay-signature"];
    const isWebhookValid = validateWebhookSignature(
      req.rawBody.toString(),
      webhookSignature,
      config.RAZORPAY_WEBHOOK_SECRET,
    );
    if (!isWebhookValid) {
      throw new AppError("webhook signature verification failed", 400);
    }
    const event = req.body.event;
    if (event === "payment.captured") {
    }
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log("error in razorpay web hook logic");
    next(error);
  }
}
