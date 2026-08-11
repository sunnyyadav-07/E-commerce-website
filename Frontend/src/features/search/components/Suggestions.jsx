import { Search, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router";

const Suggestions = ({ items = [], query = "", onSelect }) => {
  const navigate = useNavigate();

  if (!items.length) return null;

  const handleClick = (item) => {
    navigate(`/product/${item._id}`);
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  return (
    <div className="absolute top-[calc(100%+8px)] right-0 w-65 bg-white backdrop-blur-xl rounded-xl shadow-xl border border-[#3b557e]/10 overflow-hidden z-9999">

      {/* Header */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-[#3b557e]/10">
        <TrendingUp className="w-3 h-3 text-[#3b557e]" />
        <span className="text-[9px] font-bold tracking-widest uppercase text-[#3b557e]">
          Suggestions
        </span>
        <span className="ml-auto text-[9px] text-stone-400 font-medium">
          {items.length} result{items.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Scrollable items list */}
      <ul className="list-none m-0 p-0 max-h-44 overflow-y-auto">
        {items.map((item) => (
          <li key={item._id}>
            <button
              onClick={() => handleClick(item)}
              className="w-full flex items-center gap-2.5 px-2.5 py-1.5 bg-transparent border-none cursor-pointer text-left transition-colors duration-150 hover:bg-stone-50"
            >
              {/* Product image */}
              <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-stone-100 border border-black/5">
                <img
                  src={item.image?.url}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="m-0 text-[12px] font-semibold text-stone-900 leading-tight truncate">
                  {item.title}
                </p>
                <p className="mt-0.5 text-[10px] text-stone-400 leading-snug truncate">
                  {item.description}
                </p>
              </div>

              {/* Price */}
              <span className="shrink-0 text-[11px] font-bold text-[#3b557e] tracking-tight">
                {formatPrice(item.price)}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="px-2.5 py-2 border-t border-[#3b557e]/10">
        <button
          onClick={() => {
            navigate(`/products?search=${encodeURIComponent(query)}`);
            if (onSelect) onSelect();
          }}
          className="w-full flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-[#3b557e] hover:bg-[#2d4363] text-white text-[10px] font-bold tracking-widest uppercase cursor-pointer transition-colors duration-200"
        >
          <Search className="w-2.5 h-2.5" />
          View all for "{query}"
        </button>
      </div>
    </div>
  );
};

export default Suggestions;
