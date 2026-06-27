import catalogAPI from "../../catalogs/services/catalogApiInstance";

export async function suggestProducts(searchedItem) {
  const response = await catalogAPI.get(`/suggestions?search=${searchedItem}`);
  return response.data.products;
}
