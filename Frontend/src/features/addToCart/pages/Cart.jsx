import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  ShoppingBag,
  ChevronLeft,
  Trash2,
  Plus,
  Minus,
  ShieldCheck,
  RotateCcw,
  Package,
  Tag,
  Zap,
  ArrowRight,
  ShoppingCart,
} from "lucide-react";
import { useCart } from "../hooks/useCart";

/* ── Skeleton Loader ─────────────────────────────────────── */
const CartItemSkeleton = () => (
  <div className="flex gap-5 p-5 animate-pulse">
    <div className="w-24 h-28 rounded-2xl bg-stone-200 shrink-0" />
    <div className="flex-1 space-y-3 pt-1">
      <div className="h-3 bg-stone-200 rounded-full w-3/5" />
      <div className="h-3 bg-stone-200 rounded-full w-2/5" />
      <div className="h-3 bg-stone-200 rounded-full w-1/4 mt-4" />
      <div className="flex items-center gap-3 mt-4">
        <div className="h-9 w-28 bg-stone-200 rounded-xl" />
        <div className="h-9 w-9 bg-stone-200 rounded-xl" />
      </div>
    </div>
  </div>
);

/* ── Cart Item Card ──────────────────────────────────────── */
const CartItemCard = ({ item, onUpdateQty, onRemove }) => {
  const [removing, setRemoving] = useState(false);

  const variant = item.variant || {};
  const product = item.product || {};
  const price = variant.price || {};
  const images = variant.images || product.images || [];
  const attributes = variant.attributes || {};
  const currencySymbol =
    price.currency === "INR" ? "₹" : price.currency === "USD" ? "$" : price.currency || "₹";
  const itemTotal = (price.amount || 0) * (item.quantity || 1);

  async function handleRemove() {
    setRemoving(true);
    await onRemove(item._id);
  }

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
            alt={product.title || "Product"}
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
              {product.title || "Product"}
            </h3>
            {product.brand && (
              <p className="text-[10px] uppercase tracking-widest text-stone-400 font-semibold mt-0.5">
                {product.brand}
              </p>
            )}
          </div>
          <button
            onClick={handleRemove}
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
              onClick={() => onUpdateQty(item._id, Math.max(1, (item.quantity || 1) - 1))}
              className="cursor-pointer w-9 h-9 flex items-center justify-center text-stone-500 hover:bg-stone-200 hover:text-stone-900 transition-colors disabled:opacity-30"
              disabled={(item.quantity || 1) <= 1}
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="w-9 text-center text-sm font-bold text-stone-900 select-none">
              {item.quantity || 1}
            </span>
            <button
              onClick={() => onUpdateQty(item._id, (item.quantity || 1) + 1)}
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
            {(item.quantity || 1) > 1 && (
              <p className="text-[10px] text-stone-400 mt-0.5">
                {currencySymbol}
                {price.amount?.toLocaleString("en-IN")} each
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── Empty State ─────────────────────────────────────────── */
const EmptyCart = ({ onContinueShopping }) => (
  <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
    <div className="relative">
      <div className="w-28 h-28 rounded-full bg-stone-100 flex items-center justify-center">
        <ShoppingCart className="w-12 h-12 text-stone-300" />
      </div>
      <div className="absolute -top-1 -right-1 w-8 h-8 bg-[#3b557e] rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">
        0
      </div>
    </div>
    <div>
      <h2 className="text-2xl font-bold text-stone-900 tracking-tight mb-2">
        Your bag is empty
      </h2>
      <p className="text-stone-400 text-sm max-w-xs leading-relaxed">
        Looks like you haven't added anything yet. Explore our collection and
        find something you'll love.
      </p>
    </div>
    <button
      onClick={onContinueShopping}
      className="cursor-pointer flex items-center gap-2 px-8 py-4 bg-[#3b557e] text-white text-xs font-bold uppercase tracking-widest rounded-2xl hover:bg-[#2d4363] active:scale-95 transition-all duration-200 shadow-lg hover:shadow-xl"
    >
      <ShoppingBag className="w-4 h-4" />
      Continue Shopping
    </button>
  </div>
);

/* ── Order Summary Panel ─────────────────────────────────── */
const OrderSummary = ({ items, onCheckout, onContinueShopping }) => {
  const subtotal = items.reduce((acc, item) => {
    const price = item.variant?.price?.amount || 0;
    return acc + price * (item.quantity || 1);
  }, 0);

  const currency = items[0]?.variant?.price?.currency;
  const currencySymbol =
    currency === "INR" ? "₹" : currency === "USD" ? "$" : "₹";

  const shippingThreshold = currency === "INR" ? 2000 : 30;
  const shippingFee = subtotal >= shippingThreshold ? 0 : currency === "INR" ? 99 : 5;
  const total = subtotal + shippingFee;
  const savings = 0; // placeholder for discount logic

  return (
    <div className="sticky top-24 flex flex-col gap-5">
      {/* Summary Card */}
      <div className="bg-white rounded-3xl border border-stone-100 shadow-sm p-6 space-y-5">
        <h2 className="text-[11px] uppercase tracking-widest font-bold text-stone-400">
          Order Summary
        </h2>

        {/* Line items */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between text-stone-600">
            <span>
              Subtotal ({items.length} item{items.length !== 1 ? "s" : ""})
            </span>
            <span className="font-semibold text-stone-900">
              {currencySymbol}
              {subtotal.toLocaleString("en-IN")}
            </span>
          </div>
          <div className="flex justify-between text-stone-600">
            <span>Shipping</span>
            {shippingFee === 0 ? (
              <span className="text-emerald-500 font-semibold">Free</span>
            ) : (
              <span className="font-semibold text-stone-900">
                {currencySymbol}
                {shippingFee}
              </span>
            )}
          </div>
          {savings > 0 && (
            <div className="flex justify-between text-emerald-600">
              <span>Discount</span>
              <span className="font-semibold">
                −{currencySymbol}
                {savings}
              </span>
            </div>
          )}
        </div>

        {/* Free shipping progress */}
        {shippingFee > 0 && (
          <div className="p-3 bg-amber-50 border border-amber-100 rounded-2xl">
            <p className="text-[11px] text-amber-700 font-semibold mb-2">
              Add {currencySymbol}
              {(shippingThreshold - subtotal).toLocaleString("en-IN")} more for
              free shipping
            </p>
            <div className="w-full h-1.5 bg-amber-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-400 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(100, (subtotal / shippingThreshold) * 100)}%`,
                }}
              />
            </div>
          </div>
        )}

        {shippingFee === 0 && (
          <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-100 rounded-2xl">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <p className="text-[11px] text-emerald-700 font-semibold">
              You've unlocked free shipping! 🎉
            </p>
          </div>
        )}

        <div className="border-t border-stone-100" />

        {/* Total */}
        <div className="flex justify-between items-baseline">
          <span className="text-base font-bold text-stone-900">Total</span>
          <div className="text-right">
            <span className="text-2xl font-bold text-stone-900">
              {currencySymbol}
              {total.toLocaleString("en-IN")}
            </span>
            <p className="text-[10px] text-stone-400 mt-0.5">Incl. all taxes</p>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onCheckout}
          className="cursor-pointer w-full flex items-center justify-center gap-2 py-4 bg-[#3b557e] text-white text-sm font-bold uppercase tracking-widest rounded-2xl hover:bg-[#2d4363] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          <Zap className="w-4 h-4" />
          Proceed to Checkout
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

/* ── Main Cart Page ──────────────────────────────────────── */
const Cart = () => {
  const navigate = useNavigate();
  const { handleGetAllCartProducts, handleUpdateCartItem, handleRemoveFromCart } =
    useCart();

  const cartItems = useSelector((state) => state.cart.allCartProducts);
  const loading = useSelector((state) => state.cart.loading);

  useEffect(() => {
    handleGetAllCartProducts();
  }, []);

  const itemCount = cartItems?.length ?? 0;

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
            <ShoppingBag className="w-4 h-4" />
            <span>Bag ({itemCount})</span>
          </div>
        </div>
      </nav>

      {/* ── Page Header ── */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-10 pb-2">
        <p className="text-[11px] uppercase tracking-[0.3em] text-stone-400 mb-1">
          My Shopping
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 tracking-tight">
          Your Bag
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
        {/* Loading state */}
        {loading && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <CartItemSkeleton key={i} />
              ))}
            </div>
            {/* Summary skeleton */}
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
          <EmptyCart onContinueShopping={() => navigate("/")} />
        )}

        {/* Filled cart */}
        {!loading && itemCount > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">
            {/* Left: item list */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItemCard
                  key={item._id}
                  item={item}
                  onUpdateQty={handleUpdateCartItem}
                  onRemove={handleRemoveFromCart}
                />
              ))}

              {/* Continue shopping link (mobile) */}
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

            {/* Right: order summary */}
            <OrderSummary
              items={cartItems}
              onCheckout={() => {
                /* hook up checkout route when ready */
              }}
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

export default Cart;
