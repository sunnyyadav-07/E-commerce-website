import catalogAPI from "./catalogApiInstance";

export async function getCatalogProducts(category) {
  const response = await catalogAPI.get(`?category=${category}`);
  return response.data;
}
