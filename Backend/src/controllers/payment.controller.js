import { config } from "../config/config.js";
import paymentModel from "../models/payment.model.js";
import { calculateOrderAmount } from "../services/order.service.js";
import razorpayInstance from "../services/razorpay.service.js";
import { AppError } from "../utils/appError.js";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js";

export async function createRazorpayOrderController(req, res, next) {
  try {
    const { items } = req.body;
    // const { totalAmount } = calculateOrderAmount(items);
    const options = {
      amount: 7000 * 100,
      currency: "INR",
    };
    const razorpayOrder = await razorpayInstance.orders.create(options);
    const payment = await paymentModel.create({
      user: req.user._id,
      price: {
        amount: 7000,
        currency: "INR",
      },
      razorpayOrderId: razorpayOrder.id,
    });
    res.status(200).json({
      success: true,
      message: "Razorpay created order successfully",
      order: razorpayOrder,
      amount: 7000,
    });
  } catch (error) {
    console.log("error in razorpay order creation logic");
    next(error);
  }
}

export async function verifyPaymentController(req, res, next) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
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
        { razorpayOrderId: razorpay_order_id, user: req.user._id },
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
      },
      {
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        status: "paid",
        method: paymentDetails.method,
      },
      { new: true },
    );

    if (!payment) {
      throw new AppError("Payment record not found", 404);
    }
    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      payment,
    });
  } catch (error) {
    console.log("error in payment verification logic");
    next(error);
  }
}
