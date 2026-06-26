import catalogAPI from "./catalogApiInstance";

export async function getCatalogProducts(params) {
  const response = await catalogAPI.get("", { params });
  return response.data;
}
