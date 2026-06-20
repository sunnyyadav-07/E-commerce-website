import api from "./productApiInstance";

export async function getSellerProducts() {
  const response = await api.get("/seller");
  return response.data;
}

export async function createParentProduct(formData) {
  const response = await api.post("/create", formData);
  return response.data;
}

export async function createProductVariant(productId, formData) {
  const response = await api.post(`/${productId}/variant`, formData);
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
export async function updateProduct(productId, variantId, data) {
  const response = await api.patch(`/${productId}/${variantId}`, data);
  return response.data;
}
