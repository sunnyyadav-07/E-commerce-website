import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    items: [
      {
        seller: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "user",
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "product",
        },
        variant: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        price: {
          type: Number,
          required: true,
          min: [0, "Price can not be negative"],
        },
        quantity: {
          type: Number,
          required: true,
          min: [1, "Quantity must be at least 1 "],
        },
        itemStatus: {
          type: String,
          enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
          default: "pending",
        },
        isSeenBySeller: {
          type: Boolean,
          default: false,
        },
      },
    ],
    orderStatus: {
      type: String,
      enum: ["pending", "placed", "cancelled"],
      default: "pending",
    },
    totalAmount: {
      type: Number,
      required: true,
      min: [0, "Total amount can not be negative"],
    },
  },
  { timestamps: true },
);

const orderModel = mongoose.model("order", orderSchema);
export default orderModel;
