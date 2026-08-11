import {
  Heart,
  LayoutDashboard,
  LogIn,
  Package,
  ShoppingBag,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import useAuth from "../../auth/hooks/useAuth";
import SearchBar from "../../shared/components/SearchBar";
import LogoutButton from "../../shared/components/LogoutButton";

const NAV_CATEGORIES = [
  { label: "Men" },
  { label: "Women" },
  { label: "Kids" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopSearchOpen, setDesktopSearchOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.allCartProducts);
  const cartCount = cartItems?.length ?? 0;
  const user = useSelector((state) => state.auth.user);
  const authLoading = useSelector((state) => state.auth.loading);
  const isSeller = user?.role === "seller";
  const { handleLogoutUser } = useAuth();

  const closeMobile = () => setMobileOpen(false);

  const handleCategoryNav = (label) => {
    navigate(`/products/catalog/${label}`);
    closeMobile();
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-10 h-16 grid grid-cols-2 md:grid-cols-3 items-center">
          {/* Logo */}
          <a
            href="#"
            className="text-xl font-black tracking-[0.2em] uppercase text-stone-900 shrink-0"
          >
            Atelier
          </a>

          {/* Centre — Category Links (desktop only, hidden while search is open) */}
          <div
            className="hidden md:flex items-center gap-1 justify-self-center transition-opacity duration-200"
            style={{ opacity: desktopSearchOpen ? 0 : 1, pointerEvents: desktopSearchOpen ? "none" : "auto" }}
          >
            {NAV_CATEGORIES.map(({ label }) => (
              <button
                onClick={() => handleCategoryNav(label)}
                key={label}
                className="relative cursor-pointer px-5 py-5 text-[12px] uppercase tracking-[0.15em] font-semibold text-stone-600 hover:text-stone-900 transition-colors duration-200 group"
              >
                {label}
                <span className="absolute bottom-3 left-5 right-5 h-0.5 bg-[#3b557e] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 justify-self-end">
            {authLoading ? (
              <div className="flex items-center gap-2 animate-pulse">
                <div className="w-8 h-8 rounded-xl bg-stone-200" />
                <div className="w-8 h-8 rounded-xl bg-stone-200" />
                <div className="w-20 h-8 rounded-xl bg-stone-200" />
              </div>
            ) : (
              <>
                {/* Search */}
                <SearchBar
                  onOpen={() => setDesktopSearchOpen(true)}
                  onClose={() => setDesktopSearchOpen(false)}
                />

                {/* Dashboard — sellers, desktop only */}
                {isSeller && (
                  <button
                    onClick={() => { navigate("/seller/dashboard"); closeMobile(); }}
                    title="Your Dashboard"
                    className="hidden md:flex cursor-pointer items-center gap-1.5 px-3 py-2 rounded-xl text-stone-500 hover:text-[#3b557e] hover:bg-[#3b557e]/10 transition-colors duration-200 text-[11px] uppercase tracking-widest font-bold group"
                  >
                    <LayoutDashboard className="w-4.5 h-4.5 group-hover:scale-110 transition-transform duration-200" />
                    <span>Dashboard</span>
                  </button>
                )}

                {/* Wishlist — buyers, desktop only */}
                {!isSeller && (
                  <button
                    onClick={() => navigate("/wishlist")}
                    className="hidden md:flex cursor-pointer items-center p-2 rounded-xl text-stone-500 hover:text-rose-500 hover:bg-rose-50 transition-colors group"
                  >
                    <Heart className="w-4.5 h-4.5 group-hover:fill-rose-500 group-hover:text-rose-500 transition-all duration-200" />
                  </button>
                )}

                {/* My Orders — buyers, desktop only */}
                {!isSeller && user && (
                  <button
                    onClick={() => navigate("/my-orders")}
                    title="My Orders"
                    className="hidden md:flex cursor-pointer items-center gap-1.5 px-3 py-2 rounded-xl text-stone-500 hover:text-[#3b557e] hover:bg-[#3b557e]/10 transition-colors duration-200 text-[11px] uppercase tracking-widest font-bold group"
                  >
                    <Package className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                    <span>Orders</span>
                  </button>
                )}

                {/* Cart — buyers (always visible) */}
                {!isSeller && (
                  <button
                    onClick={() => navigate("/my-cart")}
                    className="cursor-pointer flex items-center gap-2 pl-3 pr-4 py-2 bg-[#3b557e] text-white text-[11px] uppercase tracking-widest font-bold rounded-xl hover:bg-[#2d4363] active:scale-95 transition-all duration-200 shadow-sm"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    {cartCount > 0 && (
                      <span className="bg-white text-[#3b557e] text-[10px] font-black rounded-full w-5 h-5 flex items-center justify-center leading-none">
                        {cartCount}
                      </span>
                    )}
                  </button>
                )}

                {/* Auth — desktop only */}
                <div className="hidden md:block">
                  {user ? (
                    <LogoutButton />
                  ) : (
                    <button
                      onClick={() => navigate("/login")}
                      className="cursor-pointer flex items-center gap-1.5 pl-3 pr-4 py-2 bg-[#3b557e] text-white text-[11px] uppercase tracking-widest font-bold rounded-xl hover:bg-[#2d4363] active:scale-95 transition-all duration-200 shadow-sm group"
                    >
                      <LogIn className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
                      <span>Login</span>
                    </button>
                  )}
                </div>
              </>
            )}

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="md:hidden cursor-pointer p-2 rounded-xl hover:bg-stone-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5 text-stone-700" />
              ) : (
                <Menu className="w-5 h-5 text-stone-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Strip — always visible below navbar on mobile */}
        <div className="md:hidden px-4 py-2 border-t border-stone-100 bg-white">
          <SearchBar className="relative flex items-center w-full" alwaysOpen />
        </div>

        {/* Mobile Category Strip — horizontal scroll, always visible */}
        <div className="md:hidden bg-white border-b border-stone-200">
          <div className="flex items-center gap-2 px-4 py-2 overflow-x-auto scrollbar-none">
            {NAV_CATEGORIES.map(({ label }) => (
              <button
                key={label}
                onClick={() => handleCategoryNav(label)}
                className="shrink-0 px-5 py-1.5 rounded-full border border-stone-300 text-[11px] uppercase tracking-widest font-semibold text-stone-600 hover:bg-[#3b557e] hover:text-white hover:border-[#3b557e] active:scale-95 transition-all duration-200"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 py-4 bg-white border-t border-stone-100 flex flex-col gap-1">
            {/* Seller Dashboard */}
            {isSeller && (
              <button
                onClick={() => { navigate("/seller/dashboard"); closeMobile(); }}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-semibold text-stone-600 hover:text-[#3b557e] hover:bg-[#3b557e]/10 transition-colors duration-150"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </button>
            )}

            {/* Wishlist */}
            {!isSeller && (
              <button
                onClick={() => { navigate("/wishlist"); closeMobile(); }}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-semibold text-stone-600 hover:text-rose-500 hover:bg-rose-50 transition-colors duration-150"
              >
                <Heart className="w-4 h-4" />
                Wishlist
              </button>
            )}

            {/* My Orders */}
            {!isSeller && user && (
              <button
                onClick={() => { navigate("/my-orders"); closeMobile(); }}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-[13px] font-semibold text-stone-600 hover:text-[#3b557e] hover:bg-[#3b557e]/10 transition-colors duration-150"
              >
                <Package className="w-4 h-4" />
                My Orders
              </button>
            )}

            {/* Auth */}
            <div className="mt-1">
              {user ? (
                <div className="px-1">
                  <LogoutButton />
                </div>
              ) : (
                <button
                  onClick={() => { navigate("/login"); closeMobile(); }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#3b557e] text-white text-[12px] uppercase tracking-widest font-bold rounded-xl hover:bg-[#2d4363] active:scale-95 transition-all duration-200"
                >
                  <LogIn className="w-4 h-4" />
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Backdrop overlay — closes menu on outside click */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 md:hidden"
          onClick={closeMobile}
        />
      )}
    </>
  );
};

export default Navbar;
