import { Heart, Search, ShoppingBag } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const NAV_CATEGORIES = [
  { label: "Men" },
  { label: "Women" },
  { label: "Kids" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.allCartProducts);
  const cartCount = cartItems?.length ?? 0;
  const user = useSelector((state) => state.auth.user);
  const authLoading = useSelector((state) => state.auth.loading);
  const isSeller = user?.role === "seller";

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="text-xl font-black tracking-[0.2em] uppercase text-stone-900 shrink-0"
        >
          Atelier
        </a>

        {/* Centre — Category Links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_CATEGORIES.map(({ label }) => (
            <button
              onClick={() => {
                navigate(`/products/catalog/${label}`);
              }}
              key={label}
              className="relative cursor-pointer px-5 py-5 text-[12px] uppercase tracking-[0.15em] font-semibold text-stone-600 hover:text-stone-900 transition-colors duration-200 group"
            >
              {label}
              {/* Animated underline */}
              <span className="absolute bottom-3 left-5 right-5 h-[2px] bg-[#3b557e] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
            </button>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <button className="cursor-pointer hidden md:flex items-center p-2 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors">
            <Search className="w-[18px] h-[18px]" />
          </button>

          {/* Wishlist — only for buyers, hidden while auth resolves */}
          {!authLoading && !isSeller && (
            <button
              onClick={() => navigate("/wishlist")}
              className="cursor-pointer flex items-center p-2 rounded-xl text-stone-500 hover:text-rose-500 hover:bg-rose-50 transition-colors group"
              title="Wishlist"
            >
              <Heart className="w-[18px] h-[18px] group-hover:fill-rose-500 group-hover:text-rose-500 transition-all duration-200" />
            </button>
          )}

          {/* Cart — only for buyers, hidden while auth resolves */}
          {!authLoading && !isSeller && (
            <button
              onClick={() => navigate("/my-cart")}
              className="cursor-pointer flex items-center gap-2 pl-3 pr-4 py-2 bg-[#3b557e] text-white text-[11px] uppercase tracking-widest font-bold rounded-xl hover:bg-[#2d4363] active:scale-95 transition-all duration-200 shadow-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              Bag
              {cartCount > 0 && (
                <span className="bg-white text-[#3b557e] text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center leading-none">
                  {cartCount}
                </span>
              )}
            </button>
          )}

          {/* Mobile Hamburger */}
          <button className="md:hidden cursor-pointer p-2 rounded-xl hover:bg-stone-100 transition-colors">
            <svg
              className="w-5 h-5 text-stone-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
