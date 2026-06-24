import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    sellerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["boy", "girl", "men", "women"],
      default: null,
    },
    productType: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["draft", "active", "archived"],
      default: "draft",
    },
    searchTerms: {
      type: [String],
      default: [],
    },
    variants: [
      {
        sku: {
          type: String,
          required: true,
          unique: true,
          uppercase: true,
          trim: true,
        },
        images: [
          {
            url: {
              type: String,
              required: true,
            },
          },
        ],
        stock: {
          type: Number,
          default: 0,
        },
        price: {
          amount: {
            type: Number,
            required: true,
          },
          currency: {
            type: String,
            enum: ["USD", "EUR", "GBP", "JPY", "INR"],
            default: "INR",
          },
        },
        attributes: {
          type: Map,
          of: String,
          required: true,
        },
        isDefault: {
          type: Boolean,
          default: false,
        },

        status: {
          type: String,
          enum: ["active", "inactive", "out_of_stock"],
          default: "active",
        },
      },
    ],
  },
  { timestamps: true },
);
productSchema.pre("save", function () {
  const searchKeywords = [
    this.title,
    this.brand,
    this.category,
    this.description,
    this.productType,
    this.gender,
  ]
    .filter(Boolean)
    .map((v) => v.toLowerCase());
  const variantKeywords = [];
  for (const variant of this.variants) {
    for (const value of variant.attributes.values()) {
      if (value) {
        variantKeywords.push(value.toLowerCase());
      }
    }
  }
  this.searchTerms = [...new Set([...searchKeywords, ...variantKeywords])];
});

productSchema.index({
  searchTerms: "text",
});
const productModel = mongoose.model("product", productSchema);
export default productModel;
