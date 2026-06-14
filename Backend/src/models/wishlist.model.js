import mongoose from "mongoose";
const wishListSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        variantId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);
const wishListModel = mongoose.model("wishlist", wishListSchema);
export default wishListModel;
