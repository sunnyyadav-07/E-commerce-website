import axios from "axios";
const cartApi = axios.create({
  baseURL: "/api/add-to-cart",
  withCredentials: true,
});

export default cartApi;
