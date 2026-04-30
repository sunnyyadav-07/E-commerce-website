import api from "./productApiInstance";

export async function getSellerProducts() {
  const response = await api.get("/seller");
  return response.data;
}

export async function createProduct(formData) {
  const response = await api.post("/", formData);
  return response.data;
}
export async function getAllProducts() {
  const response = await api.get("/");
  return response.data;
}
export async function getProductDetails(productId) {
  const response = await api.get(`/detail/${productId}`);
  return response.data;
}
