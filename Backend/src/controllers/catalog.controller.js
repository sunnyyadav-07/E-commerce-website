import productModel from "../models/product.model.js";

export async function getCategoryController(req, res, next) {
  try {
    let { category, search } = req.query;
    const query = {};
    if (search) {
      query.$text = {
        $search: search,
      };
    }
    if (category) {
      if (category == "Men") category = "Men's Clothing";
      else if (category == "Women") category = "Women's Clothing";
      else if (category == "Kids") category = "Kids' Clothing";
      query.category = category;
    }
    let products = await productModel.find(query).select("-searchTerms");
    if (products.length == 0) {
      throw new AppError("Not found", 404);
    }
    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    console.log("Error in product catalog api", error);
    next(error);
  }
}

export async function getSuggestionsController(req, res, next) {
  try {
    let { search } = req.query;
    const query = {};
    if (search?.trim()) {
      query.$text = {
        $search: search,
      };
    } else {
      return res.status(200).json({
        success: true,
        products: [],
      });
    }
    const products = await productModel
      .find(query)
      .select("_id title description variants.price variants.images")
      .limit(8)
      .lean();

    const formattedInfo = products.map((p) => {
      return {
        _id: p._id,
        title: p.title,
        description: p.description,
        image: p.variants[0].images[0],
        price: p.variants[0].price.amount,
      };
    });
    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products: formattedInfo,
    });
  } catch (error) {
    console.log("Error in product suggestion api", error);
    next(error);
  }
}
