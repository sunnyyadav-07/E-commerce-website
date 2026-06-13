import axios from "axios";
const cartApi = axios.create({
  baseURL: "/api/cart",
  withCredentials: true,
});

export default cartApi;
