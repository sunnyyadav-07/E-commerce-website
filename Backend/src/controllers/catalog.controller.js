import productModel from "../models/product.model.js";

export async function getCategoryController(req, res) {
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
      return res.status(404).json({
        success: false,
        message: "Not found",
        products: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    console.log("Error in product catalog api", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

export async function getSuggestionsController(req, res) {
  
}
