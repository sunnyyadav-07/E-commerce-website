import { Heart, Search, ShoppingBag, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
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

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef(null);
  const searchWrapperRef = useRef(null);

  // Auto-focus input when opened
  useEffect(() => {
    if (searchOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [searchOpen]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(e.target)
      ) {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };
    if (searchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen]);

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
    if (e.key === "Escape") {
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

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
          <div ref={searchWrapperRef} className="hidden md:flex items-center">
            <div
              style={{
                width: searchOpen ? "220px" : "0px",
                opacity: searchOpen ? 1 : 0,
                overflow: "hidden",
                transition:
                  "width 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease",
                display: "flex",
                alignItems: "center",
              }}
            >
              <div className="flex items-center gap-1 bg-stone-100 rounded-xl px-3 py-1.5 w-full border border-stone-200 focus-within:border-[#3b557e] focus-within:ring-2 focus-within:ring-[#3b557e]/20 transition-all">
                <Search className="w-[14px] h-[14px] text-stone-400 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchSubmit}
                  placeholder="Search products…"
                  className="bg-transparent text-[12px] text-stone-800 placeholder-stone-400 outline-none w-full"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-stone-400 hover:text-stone-600 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
            <button
              onClick={() => {
                if (searchOpen) {
                  setSearchOpen(false);
                  setSearchQuery("");
                } else {
                  setSearchOpen(true);
                }
              }}
              className="cursor-pointer flex items-center p-2 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors ml-1"
              title="Search"
            >
              {searchOpen ? (
                <X className="w-[18px] h-[18px]" />
              ) : (
                <Search className="w-[18px] h-[18px]" />
              )}
            </button>
          </div>

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
