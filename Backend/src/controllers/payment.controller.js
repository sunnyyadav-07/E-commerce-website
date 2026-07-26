import { calculateOrderAmount } from "../services/order.service.js";
import razorpayInstance from "../services/razorpay.service.js";

export async function createRazorpayOrderController(req, res, next) {
  try {
    const { items } = req.body;
    const { totalAmount } = calculateOrderAmount(items);
    const options = {
      amount: totalAmount * 100,
      currency: "INR",
    };
    const razorpayOrder = await razorpayInstance.orders.create(options);
    res.status(200).json({
      success: true,
      message: "Razorpay created order successfully",
      order: razorpayOrder,
      amount: totalAmount,
    });
  } catch (error) {
    console.log("error in razorpay order creation logic");
    next(error);
  }
}
