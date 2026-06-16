import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  Heart,
  HeartOff,
  ChevronLeft,
  ShoppingBag,
  Trash2,
  ShoppingCart,
  Share2,
  Tag,
  ArrowRight,
  Package,
  RotateCcw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useWishList } from "../hooks/useWishList";
import { useEffect } from "react";

/* ── Skeleton Loader ────────────────────────────────────── */
const WishItemSkeleton = () => (
  <div className="flex gap-5 p-5 animate-pulse">
    <div className="w-28 h-32 rounded-2xl bg-stone-200 shrink-0" />
    <div className="flex-1 space-y-3 pt-1">
      <div className="h-3 bg-stone-200 rounded-full w-3/5" />
      <div className="h-3 bg-stone-200 rounded-full w-2/5" />
      <div className="h-3 bg-stone-200 rounded-full w-1/4 mt-4" />
      <div className="flex items-center gap-3 mt-4">
        <div className="h-9 w-36 bg-stone-200 rounded-xl" />
        <div className="h-9 w-9 bg-stone-200 rounded-xl" />
      </div>
    </div>
  </div>
);

/* ── Wish Item Card ─────────────────────────────────────── */
const WishItemCard = ({ item }) => (
  <div className="group relative flex gap-5 p-5 bg-white rounded-3xl border border-stone-100 shadow-sm hover:shadow-md transition-all duration-300">
    {/* Heart badge */}
    <div className="absolute -top-2.5 -right-2.5 w-7 h-7 bg-rose-500 rounded-full flex items-center justify-center shadow-md z-10">
      <Heart className="w-3.5 h-3.5 text-white fill-white" />
    </div>

    {/* Product Image */}
    <div className="w-28 h-32 rounded-2xl overflow-hidden bg-stone-100 shrink-0">
      {item.image?.url ? (
        <img
          src={item.image.url}
          alt={item.title}
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
      {/* Title + Action icons */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-bold text-stone-900 text-sm leading-snug truncate">
            {item.title}
          </h3>
          {item.brand && (
            <p className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold mt-0.5">
              {item.brand}
            </p>
          )}
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button className="cursor-pointer w-8 h-8 rounded-xl flex items-center justify-center text-stone-300 hover:text-stone-600 hover:bg-stone-50 transition-all duration-200">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="cursor-pointer w-8 h-8 rounded-xl flex items-center justify-center text-stone-300 hover:text-red-500 hover:bg-red-50 transition-all duration-200">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Category badge */}
      <div className="flex gap-2 flex-wrap">
        {(item.subCategory || item.category) && (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-50 border border-stone-100 rounded-full text-[10px] uppercase tracking-widest text-stone-500 font-semibold">
            <Tag className="w-2.5 h-2.5" />
            {item.subCategory || item.category}
          </span>
        )}
      </div>

      {/* Price + Add to Bag */}
      <div className="flex items-center justify-between gap-3 mt-auto pt-2">
        <div>
          <p className="font-bold text-stone-900 text-base">
            ₹{item.price?.toLocaleString("en-IN")}
          </p>
          <p className="text-[10px] text-stone-400 mt-0.5">Incl. taxes</p>
        </div>

        <button className="cursor-pointer flex items-center gap-2 px-4 py-2.5 bg-[#3b557e] text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#2d4363] hover:shadow-lg active:scale-95 transition-all duration-200">
          <ShoppingCart className="w-3.5 h-3.5" />
          Add to Bag
        </button>
      </div>
    </div>
  </div>
);

/* ── Empty State ────────────────────────────────────────── */
const EmptyWishList = ({ onExplore }) => (
  <div className="flex flex-col items-center justify-center py-28 gap-6 text-center">
    <div className="relative">
      <div className="w-28 h-28 rounded-full bg-rose-50 flex items-center justify-center">
        <HeartOff className="w-12 h-12 text-rose-200" />
      </div>
      <div className="absolute -top-1 -right-1 w-8 h-8 bg-[#3b557e] rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
        0
      </div>
    </div>
    <div>
      <h2 className="text-2xl font-bold text-stone-900 tracking-tight mb-2">
        Your wishlist is empty
      </h2>
      <p className="text-stone-400 text-sm max-w-xs leading-relaxed">
        Save items you love and come back to them anytime. Start exploring our
        curated collection.
      </p>
    </div>
    <button
      onClick={onExplore}
      className="cursor-pointer flex items-center gap-2 px-8 py-4 bg-[#3b557e] text-white text-xs font-bold uppercase tracking-widest rounded-2xl hover:bg-[#2d4363] active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl"
    >
      <Sparkles className="w-4 h-4" />
      Explore Collection
      <ArrowRight className="w-4 h-4" />
    </button>
  </div>
);

/* ── Wishlist Summary Panel ──────────────────────────────── */
const WishListSummary = ({ items, onContinueShopping }) => {
  const totalValue = items.reduce((acc, item) => acc + (item.price || 0), 0);

  return (
    <div className="sticky top-24 flex flex-col gap-5">
      <div className="bg-white rounded-3xl border border-stone-100 shadow-sm p-6 space-y-5">
        <div className="flex items-center gap-2">
          <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
          <h2 className="text-[11px] uppercase tracking-widest font-bold text-stone-400">
            Wishlist Summary
          </h2>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between text-stone-600">
            <span>
              Saved items ({items.length} item{items.length !== 1 ? "s" : ""})
            </span>
            <span className="font-semibold text-stone-900">
              ₹{totalValue.toLocaleString("en-IN")}
            </span>
          </div>
          <div className="flex justify-between text-stone-600">
            <span>Est. shipping</span>
            <span className="text-emerald-500 font-semibold">Free</span>
          </div>
        </div>

        <div className="flex items-center gap-2 p-3 bg-rose-50 border border-rose-100 rounded-2xl">
          <Heart className="w-4 h-4 text-rose-400 fill-rose-400 shrink-0" />
          <p className="text-[11px] text-rose-600 font-semibold leading-tight">
            {items.length} item{items.length !== 1 ? "s" : ""} saved — don't let
            them sell out!
          </p>
        </div>

        <div className="border-t border-stone-100" />

        <div className="flex justify-between items-baseline">
          <span className="text-base font-bold text-stone-900">
            Total Value
          </span>
          <div className="text-right">
            <span className="text-2xl font-bold text-stone-900">
              ₹{totalValue.toLocaleString("en-IN")}
            </span>
            <p className="text-[10px] text-stone-400 mt-0.5">Incl. all taxes</p>
          </div>
        </div>

        <button className="cursor-pointer w-full flex items-center justify-center gap-2 py-4 bg-[#3b557e] text-white text-sm font-bold uppercase tracking-widest rounded-2xl hover:bg-[#2d4363] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl">
          <ShoppingCart className="w-4 h-4" />
          Move All to Bag
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={onContinueShopping}
          className="cursor-pointer w-full flex items-center justify-center gap-2 py-3.5 bg-stone-50 text-stone-700 text-xs font-bold uppercase tracking-widest rounded-2xl border border-stone-200 hover:bg-stone-100 active:scale-[0.98] transition-all duration-200"
        >
          <ChevronLeft className="w-4 h-4" />
          Continue Shopping
        </button>
      </div>

      {/* Trust badges */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { Icon: ShieldCheck, label: "Secure\nPayment" },
          { Icon: Package, label: "Free\nShipping" },
          { Icon: RotateCcw, label: "30-Day\nReturn" },
        ].map(({ Icon, label }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-2 p-3 bg-white rounded-2xl border border-stone-100 text-center"
          >
            <Icon className="w-4 h-4 text-stone-400" />
            <span className="text-[9px] uppercase tracking-widest text-stone-400 font-semibold leading-tight whitespace-pre-line">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ── Main WishList Page ──────────────────────────────────── */
const WishList = () => {
  const navigate = useNavigate();
  const { handleGetAllWisgListItems } = useWishList();
  const wishlistItems =
    useSelector((state) => state.wishlist.allWishListItem) ?? [];
  const loading = useSelector((state) => state.wishlist.loading);
  useEffect(() => {
    handleGetAllWisgListItems();
  }, []);

  const itemCount = wishlistItems.length;

  return (
    <div className="min-h-screen bg-[#F9F7F4] font-sans">
      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 bg-[#F9F7F4]/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate("/")}
            className="cursor-pointer flex items-center gap-2 text-[11px] uppercase tracking-widest font-semibold text-stone-500 hover:text-stone-900 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Shop
          </button>

          <a
            href="/"
            className="text-xl font-bold tracking-[0.15em] uppercase text-stone-900"
          >
            Atelier
          </a>

          <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-semibold text-stone-900">
            <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
            <span>Saved ({itemCount})</span>
          </div>
        </div>
      </nav>

      {/* ── Page Header ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-10 pb-2">
        <p className="text-[11px] uppercase tracking-[0.3em] text-stone-400 mb-1">
          My Collection
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 tracking-tight">
          Wishlist
          {!loading && itemCount > 0 && (
            <span className="ml-3 text-2xl md:text-3xl text-stone-300 font-semibold">
              ({itemCount})
            </span>
          )}
        </h1>
      </div>

      {/* ── Divider ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mt-6 mb-8">
        <div className="border-t border-stone-200" />
      </div>

      {/* ── Content ── */}
      <main className="max-w-7xl mx-auto px-6 md:px-10 pb-32">
        {/* Loading skeleton */}
        {loading && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <WishItemSkeleton key={i} />
              ))}
            </div>
            <div className="bg-white rounded-3xl border border-stone-100 shadow-sm p-6 space-y-4 animate-pulse">
              <div className="h-3 bg-stone-200 rounded-full w-2/5" />
              <div className="h-3 bg-stone-200 rounded-full w-full" />
              <div className="h-3 bg-stone-200 rounded-full w-full" />
              <div className="h-3 bg-stone-200 rounded-full w-3/4 mt-2" />
              <div className="h-14 bg-stone-200 rounded-2xl mt-4" />
            </div>
          </div>
        )}

        {/* Empty state */}
        {!loading && itemCount === 0 && (
          <EmptyWishList onExplore={() => navigate("/")} />
        )}

        {/* Filled wishlist */}
        {!loading && itemCount > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">
            {/* Left: item list */}
            <div className="space-y-4">
              {wishlistItems.map((item) => (
                <WishItemCard key={item.variantId} item={item} />
              ))}

              {/* Continue shopping — mobile */}
              <div className="pt-2 lg:hidden">
                <button
                  onClick={() => navigate("/")}
                  className="cursor-pointer flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-semibold text-stone-400 hover:text-stone-900 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Continue Shopping
                </button>
              </div>
            </div>

            {/* Right: summary panel */}
            <WishListSummary
              items={wishlistItems}
              onContinueShopping={() => navigate("/")}
            />
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-stone-200 bg-stone-900 text-stone-300">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-stone-600">
          <span>© 2026 Atelier. All rights reserved.</span>
          <span>Instagram · Twitter</span>
        </div>
      </footer>
    </div>
  );
};

export default WishList;
