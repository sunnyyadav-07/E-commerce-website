import React from "react";
import { useNavigate } from "react-router";
import { Layers, ChevronRight } from "lucide-react";

const DraftProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(`/seller/create-product/${product._id}/variant`)}
      className="group text-left w-full bg-white border-2 border-dashed border-amber-200 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-100/60 rounded-3xl p-5 transition-all duration-300 cursor-pointer"
    >
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="shrink-0 w-12 h-12 bg-amber-50 group-hover:bg-amber-100 rounded-2xl flex items-center justify-center transition-colors">
          <Layers size={22} className="text-amber-500" strokeWidth={1.5} />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              Draft
            </span>
          </div>
          <h4 className="font-extrabold text-slate-800 text-sm leading-snug line-clamp-1 group-hover:text-amber-700 transition-colors">
            {product.title}
          </h4>
          <p className="text-[11px] text-slate-400 font-medium mt-0.5 line-clamp-1">
            {product.brand && `${product.brand} · `}
            {product.category}
            {product.subCategory && ` · ${product.subCategory}`}
          </p>
        </div>

        {/* Arrow */}
        <ChevronRight
          size={18}
          className="shrink-0 text-amber-300 group-hover:text-amber-500 group-hover:translate-x-1 transition-all mt-1"
        />
      </div>

      <div className="mt-4 pt-4 border-t border-amber-100 flex items-center justify-between">
        <p className="text-[10px] text-slate-400 font-medium">
          0 variants · Click to add
        </p>
        <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest group-hover:underline">
          Add Variant →
        </span>
      </div>
    </button>
  );
};

export default DraftProductCard;
