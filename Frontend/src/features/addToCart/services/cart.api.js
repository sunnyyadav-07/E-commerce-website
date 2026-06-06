import cartApi from "./cartApiInstance";

export async function addToCart(data) {
  const response = await cartApi.post("/item", data);
  return response.data;
}
export async function getAllCartProducts() {
  const response = await cartApi.get("/added/items");
  return response.data;
}
