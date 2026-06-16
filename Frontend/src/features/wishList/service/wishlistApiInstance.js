import axios from "axios";
const wishlistApiInstance = axios.create({
  baseURL: "/api/wishlist",
  withCredentials: true,
});
export default wishlistApiInstance;
