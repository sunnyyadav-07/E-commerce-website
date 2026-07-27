import orderApi, { paymentApi } from "./orderApiInstance";

export async function createOrder(order) {
  const res = await paymentApi.post("/create-order", order);
  return res.data;
}
export async function getSellersOrders(status, isSeen) {
  const res = await orderApi.get(`/seller?status=${status}&isSeen=${isSeen}`);
  return res.data;
}
export async function markedOrdersSeen() {
  const res = await orderApi.put("/");
  return res.data;
}
export async function verifyPayment(data) {
  const res = await paymentApi.post("/verify", data);
  return res.data;
}
