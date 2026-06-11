import productModel from "../models/product.model.js";

export const stockOfProduct = async (productId, variantId) => {
  const product = await productModel.findOne({
    _id: productId,
  });
  const stock = product.variants?.id(variantId).stock;
  return stock;
};
