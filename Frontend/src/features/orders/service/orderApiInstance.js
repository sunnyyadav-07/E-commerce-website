import axios from "axios";

const orderApi = axios.create({
  baseURL: "/api/order",
  withCredentials: true,
});
export const paymentApi = axios.create({
  baseURL: "/api/payment",
  withCredentials: true,
});

export default orderApi;
