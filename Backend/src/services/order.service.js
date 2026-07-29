import productModel from "../models/product.model.js";

export async function calculateOrderAmount(items) {
  const productIds = items.map((item) => item.productId);
  const products = await productModel
    .find(
      { _id: { $in: productIds } },
      {
        searchTerms: 0,
      },
    )
    .lean();
  const productMap = new Map(products.map((p) => [p._id.toString(), p]));

  let totalAmount = 0;
  const orderedItems = [];
  for (const item of items) {
    const product = productMap.get(item.productId);
    if (!product) {
      throw new AppError("Product not found", 404);
    }
    let variant = product.variants.find(
      (v) => v._id.toString() === item.variantId,
    );
    if (!variant) {
      throw new AppError(
        "This variant of product not found " + item.variantId,
        404,
      );
    }
    if (variant.stock < item.quantity) {
      throw new AppError(
        `${product.title} has only ${variant.stock} left`,
        400,
      );
    }
    totalAmount += variant.price.amount * item.quantity;
    orderedItems.push({
      product: product._id,
      variant: variant._id,
      price: variant.price.amount,
      quantity: item.quantity,
      seller: product.sellerId,
    });
  }

  return { totalAmount, orderedItems };
}
