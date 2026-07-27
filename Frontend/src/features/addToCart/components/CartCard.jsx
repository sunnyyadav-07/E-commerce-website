import { useState } from "react";
import { ShoppingBag, Trash2, Plus, Minus, Tag } from "lucide-react";

/* ── Cart Item Card ──────────────────────────────────────── */
const CartCard = ({ item, updateProductQnty, removeItem }) => {
  const [removing, setRemoving] = useState(false);

  // Support both flat API shape and nested variant/product shape
  const title = item?.title;
  const brand = item?.brand;
  const images = item?.images || [];
  const attributes = item?.attributes || {};
  const rawPrice = item?.price;
  const rawCurrency = item?.currency || "INR";

  const currencySymbol =
    rawCurrency === "INR" ? "₹" : rawCurrency === "USD" ? "$" : rawCurrency;
  const itemTotal = rawPrice * (item?.quantity || 1);

  return (
    <div
      className={`group flex gap-5 p-5 bg-white rounded-3xl border border-stone-100 shadow-sm hover:shadow-md transition-all duration-300 ${
        removing ? "opacity-40 scale-[0.98] pointer-events-none" : ""
      }`}
    >
      {/* Product Image */}
      <div className="w-24 h-28 rounded-2xl overflow-hidden bg-stone-100 shrink-0 relative">
        {images[0]?.url ? (
          <img
            src={images[0].url}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-stone-300">
            <ShoppingBag className="w-8 h-8" />
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0 flex flex-col gap-2">
        {/* Title + Remove */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="font-bold text-stone-900 text-sm leading-snug truncate">
              {title}
            </h3>
            {brand && (
              <p className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold mt-0.5">
                {brand}
              </p>
            )}
          </div>
          <button
            onClick={() => {
              removeItem(item.productId, item.variantId);
            }}
            className="cursor-pointer shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-stone-300 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
            title="Remove item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Attributes */}
        <div className="flex gap-2 flex-wrap">
          {attributes.color && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-50 border border-stone-100 rounded-full text-[10px] uppercase tracking-widest text-stone-500 font-semibold">
              <span
                className="w-2.5 h-2.5 rounded-full border border-stone-200"
                style={{ backgroundColor: attributes.color }}
              />
              {attributes.color}
            </span>
          )}
          {attributes.size && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-50 border border-stone-100 rounded-full text-[10px] uppercase tracking-widest text-stone-500 font-semibold">
              <Tag className="w-2.5 h-2.5" />
              {attributes.size}
            </span>
          )}
        </div>

        {/* Qty stepper + price */}
        <div className="flex items-center justify-between gap-3 mt-auto pt-2">
          {/* Stepper */}
          <div className="flex items-center gap-0 bg-stone-50 border border-stone-200 rounded-xl overflow-hidden">
            <button
              onClick={() => {
                const data = { quantity: -1 };
                updateProductQnty(item.productId, item.variantId, data);
              }}
              className="cursor-pointer w-9 h-9 flex items-center justify-center text-stone-500 hover:bg-stone-200 hover:text-stone-900 transition-colors disabled:opacity-30"
              disabled={(item?.quantity || 1) <= 1}
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-9 text-center text-sm font-bold text-stone-900 select-none">
              {item?.quantity || 1}
            </span>
            <button
              onClick={() => {
                const data = { quantity: 1 };
                updateProductQnty(item.productId, item.variantId, data);
              }}
              className="cursor-pointer w-9 h-9 flex items-center justify-center text-stone-500 hover:bg-stone-200 hover:text-stone-900 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Item total */}
          <div className="text-right">
            <p className="font-bold text-stone-900 text-base">
              {currencySymbol}
              {itemTotal.toLocaleString("en-IN")}
            </p>
            {(item?.quantity || 1) > 1 && (
              <p className="text-[10px] text-stone-400 mt-0.5">
                {currencySymbol}
                {rawPrice.toLocaleString("en-IN")} each
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
