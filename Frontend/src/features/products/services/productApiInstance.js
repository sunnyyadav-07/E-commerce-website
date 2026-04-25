import axios from "axios";
const api = axios.create({
  baseURL: "/api/products",
  withCredentials: true,
});
export default api;
