import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ShoppingBag, ChevronLeft } from "lucide-react";
import { useCart } from "../hooks/useCart";
import AppFooter from "../../shared/components/AppFooter";
import CartCard from "../components/CartCard";
import { CartItemSkeleton, CartSummarySkeleton } from "../components/CartSkeleton";
import EmptyCart from "../components/EmptyCart";
import OrderSummary from "../components/OrderSummary";

/* ── Main Cart Page ──────────────────────────────────────── */
const Cart = () => {
  const navigate = useNavigate();
  const {
    handleGetAllCartProducts,
    handleUpdateProductQuantity,
    handleRemoveProduct,
  } = useCart();

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
            <CartSummarySkeleton />
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
                <CartCard
                  key={item?.variantId}
                  item={item}
                  updateProductQnty={handleUpdateProductQuantity}
                  removeItem={handleRemoveProduct}
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
              onContinueShopping={() => navigate("/")}
            />
          </div>
        )}
      </main>

      {/* ── Footer ── */}
      <AppFooter />
    </div>
  );
};

export default Cart;
