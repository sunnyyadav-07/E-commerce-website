import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({});

const orderModel = mongoose.model("order", orderSchema);
export default orderModel;
