import cartApi from "./cartApiInstance";

export async function addToCart(data) {
  const response = await cartApi.post("/add-to-cart/item", data);
  return response.data;
}
export async function getAllCartProducts() {
  const response = await cartApi.get("/added/items");
  return response.data;
}
export async function updateProductQuantity(productId, variantId, quantity) {
  const response = await cartApi.patch(
    `/update-quantity/${productId}/${variantId}`,
    quantity,
  );
  return response.data;
}
export async function removeProductFromCart(productId, variantId) {
  const response = await cartApi.delete(`/item/${productId}/${variantId}`);
  return response.data;
}
