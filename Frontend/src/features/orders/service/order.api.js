import orderApi from "./orderApiInstance";

export async function createOrder(orders) {
  const res = await orderApi.post("/", orders);
  return res.data;
}
export async function getSellersOrders(status, isSeen) {
  const res = await orderApi.get(`/seller?status=${status}&isSeen=${isSeen}`);
  return res.data;
}
export async function markedOrdersSeen(orderId, productId) {
  const res = await orderApi.patch(
    `?orderId=${orderId}&productId=${productId}`,
  );
  return res.data;
}
