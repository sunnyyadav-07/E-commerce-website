import mongoose from "mongoose";
import { config } from "../config/config.js";
import orderModel from "../models/order.model.js";
import paymentModel from "../models/payment.model.js";
import {
  calculateOrderAmount,
  confirmOrderAfterPayment,
} from "../services/order.service.js";
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

    const paymentBeforeUpdate = await paymentModel.findOneAndUpdate(
      {
        razorpayOrderId: razorpay_order_id,
        user: req.user._id,
      },
      {
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        status: "paid",
        method: paymentDetails.method,
      },
      { returnDocument: "before", session },
    );

    if (!paymentBeforeUpdate) {
      throw new AppError("Payment record not found", 404);
    }
    if (paymentBeforeUpdate.status === "paid") {
      // Webhook already process kar chuka tha — ye EXPECTED hai, error nahi
      await session.abortTransaction();
      session.endSession();

      return res.status(200).json({
        success: true,
        message: "Payment verified successfully",
        orderId: paymentBeforeUpdate.order,
      });
    }
    const order = await confirmOrderAfterPayment(paymentBeforeUpdate, session);
    await session.commitTransaction();
    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      orderId: order._id,
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
  const session = await mongoose.startSession();
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
      const paymentEntity = req.body.payload.payment.entity;
      const razorpayOrderId = paymentEntity.order_id;
      const razorpayPaymentId = paymentEntity.id;
      session.startTransaction();
      const paymentDetails =
        await razorpayInstance.payments.fetch(razorpayPaymentId);
      const paymentBeforeUpdate = await paymentModel.findOneAndUpdate(
        { razorpayOrderId },
        { razorpayPaymentId, status: "paid", method: paymentDetails.method },
        { returnDocument: "before", session },
      );

      if (!paymentBeforeUpdate) {
        await session.abortTransaction();
        session.endSession();
        console.error(
          `Webhook: no Payment record found for razorpayOrderId ${razorpayOrderId}`,
        );
        return res.status(200).json({ success: true });
      }
      if (paymentBeforeUpdate.status === "paid") {
        await session.abortTransaction();
        session.endSession();
        return res.status(200).json({ success: true });
      }
      await confirmOrderAfterPayment(paymentBeforeUpdate, session);
      await session.commitTransaction();
    } else if (event === "payment.failed") {
      const paymentEntity = req.body.payload.payment.entity;
      await paymentModel.findOneAndUpdate(
        {
          razorpayOrderId: paymentEntity.order_id,
          state: { $ne: "paid" },
        },
        {
          status: "failed",
        },
      );
    }
    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    if (session.inTransaction()) {
      await session.abortTransaction();
    }
    console.log("error in razorpay web hook logic");
    next(error);
  } finally {
    session.endSession();
  }
}
