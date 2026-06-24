import { useState } from "react";
import { useNavigate } from "react-router";
import { Heart, ShoppingCart } from "lucide-react";

const ProductCard = ({ product }) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const defaultVariant =
    product.variants?.find((v) => v.isDefault) || product.variants?.[0];
  const images = defaultVariant?.images || product.images || [];
  const price =
    defaultVariant?.price || product.price || { amount: 0, currency: "INR" };
  const currency =
    price.currency === "INR" ? "₹" : price.currency === "USD" ? "$" : price.currency;

  return (
    <div
      className="group cursor-pointer"
      onClick={() => navigate(`/product/${product._id}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-stone-100 mb-4">
        {images.length > 0 ? (
          <>
            <img
              src={images[0].url}
              alt={product.title}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                hovered && images.length > 1 ? "opacity-0 scale-105" : "opacity-100 scale-100"
              }`}
            />
            {images.length > 1 && (
              <img
                src={images[1].url}
                alt={`${product.title} alt`}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                  hovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
                }`}
              />
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-stone-400 text-sm">
            No Image
          </div>
        )}

        {/* Quick View overlay */}
        <div
          className={`absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/70 to-transparent transition-all duration-300 ${
            hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <button className="cursor-pointer w-full py-3 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-stone-100 transition-colors">
            Quick View
          </button>
        </div>

        {/* Wishlist pill */}
        <button
          className={`cursor-pointer absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm transition-all duration-300 hover:scale-110 ${
            hovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <Heart className="w-4 h-4 text-stone-700" />
        </button>

        {/* Photo count badge */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-3 px-2 py-1 bg-black/50 backdrop-blur-sm text-white text-[10px] rounded-full">
            {images.length} photos
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col px-1 pt-2 min-h-[130px]">
        <div className="flex justify-between items-start gap-2 mb-1">
          <h3 className="font-semibold text-stone-900 text-sm leading-snug line-clamp-2 capitalize flex-1">
            {product.title}
          </h3>
          <span className="font-bold text-stone-900 text-sm shrink-0">
            {currency}{price.amount?.toLocaleString("en-IN")}
          </span>
        </div>
        <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        <div className="pt-3 mt-auto">
          <button
            className="cursor-pointer w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#3b557e] text-white text-[11px] font-bold uppercase tracking-widest rounded-xl hover:bg-[#2d4363] active:scale-95 transition-all duration-200 shadow-sm hover:shadow-md group/cart"
            onClick={(e) => e.stopPropagation()}
          >
            <ShoppingCart className="w-4 h-4 transition-transform group-hover/cart:-translate-y-0.5" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
