import axios from "axios";

const catalogAPI = axios.create({
  baseURL: "/api/catalog",
  withCredentials: true,
});
export default catalogAPI;
