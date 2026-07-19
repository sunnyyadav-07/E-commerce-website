import axios from "axios";

const orderApi = axios.create({
  baseURL: "/api/order",
  withCredentials: true,
});

export default orderApi;
