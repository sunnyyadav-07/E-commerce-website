import wishlistApiInstance from "./wishlistApiInstance";

export async function addToWishList(data) {
  const response = await wishlistApiInstance.post("/add", data);
  return response.data;
}
export async function getAllWishListItems() {
  const response = await wishlistApiInstance.get("/all-items");
  return response.data;
}
export async function removeFromWishList(productId, variantId) {
  const response = await wishlistApiInstance.delete(
    `/item/:${productId}/:${variantId}`,
  );
  return response.data;
}
