import React from "react";
import { useNavigate } from "react-router";
import { Trash2, ArrowUpRight } from "lucide-react";

const LiveProductCard = ({ product }) => {
  const navigate = useNavigate();

  const defaultVariant =
    product.variants?.find((v) => v.isDefault) || product.variants?.[0];
  const imageUrl = defaultVariant?.images?.[0]?.url;
  const price = defaultVariant?.price || { amount: 0, currency: "INR" };
  const currencySymbol =
    price.currency === "INR" ? "₹" : price.currency === "USD" ? "$" : price.currency;

  const totalStock = product.variants?.reduce((sum, v) => sum + (v.stock || 0), 0);

  const colors = [
    ...new Set(product.variants?.map((v) => v.attributes?.color).filter(Boolean)),
  ];
  const sizes = [
    ...new Set(product.variants?.map((v) => v.attributes?.size).filter(Boolean)),
  ];

  const isLowStock = totalStock > 0 && totalStock < 5;
  const isOutOfStock = totalStock === 0;

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group flex flex-col h-full">
      {/* Image */}
      <div
        onClick={() => navigate(`/product/${product._id}`)}
        className="relative aspect-[4/5] overflow-hidden bg-slate-50 cursor-pointer"
      >
        <img
          src={imageUrl}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          <span className="bg-white/90 backdrop-blur-md text-[#1a1a1a] text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-wider">
            {product.brand || "Atelier"}
          </span>
          {product.category && (
            <span className="bg-slate-900/80 backdrop-blur-sm text-white text-[9px] font-semibold px-2.5 py-1 rounded-full shadow-sm uppercase tracking-wider w-fit">
              {product.category}
            </span>
          )}
        </div>

        {/* Status & Stock */}
        <div className="absolute top-4 right-4 flex flex-col items-end gap-2 z-10">
          <span
            className={`backdrop-blur-md text-[10px] font-bold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-wider flex items-center gap-1.5 ${
              product.status === "active"
                ? "bg-emerald-500/90 text-white"
                : "bg-slate-500/90 text-white"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full bg-white ${
                product.status === "active" ? "animate-pulse" : ""
              }`}
            />
            {product.status || "Active"}
          </span>

          {isOutOfStock ? (
            <span className="bg-rose-500/90 backdrop-blur-sm text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
              Out of Stock
            </span>
          ) : isLowStock ? (
            <span className="bg-amber-500/90 backdrop-blur-sm text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm animate-pulse">
              Low Stock ({totalStock})
            </span>
          ) : (
            <span className="bg-emerald-600/90 backdrop-blur-sm text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
              Stock: {totalStock}
            </span>
          )}
        </div>

        {/* Hover Actions */}
        <div className="absolute bottom-4 right-4 flex gap-2 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 z-20">
          <button
            className="p-2.5 bg-white rounded-full text-rose-500 hover:bg-rose-50 hover:scale-110 shadow-lg transition-all cursor-pointer"
            title="Delete Product"
          >
            <Trash2 size={16} />
          </button>
        </div>

        {product.variants?.length > 1 && (
          <div className="absolute bottom-4 left-4 text-white text-[10px] font-bold tracking-wider uppercase drop-shadow z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {product.variants.length} Variants Available
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow justify-between gap-4 bg-white">
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-extrabold text-slate-800 text-base leading-snug line-clamp-1 group-hover:text-[#3b557e] transition-colors">
                {product.title}
              </h3>
              <p className="text-[#3b557e] font-black text-base whitespace-nowrap">
                {currencySymbol} {price.amount?.toLocaleString()}
              </p>
            </div>
            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-medium">
              {product.description}
            </p>
          </div>

          {(colors.length > 0 || sizes.length > 0) && (
            <div className="pt-3 flex flex-wrap gap-x-4 gap-y-2 items-center text-[10px] border-t border-slate-50">
              {colors.length > 0 && (
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400 font-bold uppercase tracking-widest">
                    Colors:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {colors.map((color, cIdx) => (
                      <span
                        key={cIdx}
                        className="px-2 py-0.5 bg-slate-50 text-slate-700 font-semibold border border-slate-100 rounded-md"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {sizes.length > 0 && (
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-400 font-bold uppercase tracking-widest">
                    Sizes:
                  </span>
                  <div className="flex flex-wrap gap-0.5">
                    {sizes.map((size, sIdx) => (
                      <span
                        key={sIdx}
                        className="w-5 h-5 bg-slate-50 text-slate-700 font-semibold border border-slate-100 rounded-md flex items-center justify-center text-[9px]"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[10px]">
          <span className="text-slate-400 font-medium tracking-wide">
            {product.subCategory && `In ${product.subCategory}`}
          </span>
          <button
            onClick={() => navigate(`/product/${product._id}`)}
            className="flex items-center gap-1 font-bold text-[#3b557e] uppercase tracking-widest hover:gap-2 transition-all cursor-pointer"
          >
            Details <ArrowUpRight size={12} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveProductCard;
