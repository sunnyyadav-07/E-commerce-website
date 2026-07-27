import {
  ShieldCheck,
  RotateCcw,
  Package,
  Zap,
  ArrowRight,
  ChevronLeft,
} from "lucide-react";

/* ── Order Summary Panel ─────────────────────────────────── */
const OrderSummary = ({ items, onContinueShopping }) => {
  const subtotal = items?.reduce((acc, item) => {
    const price = item?.price;
    return acc + price * (item?.quantity || 1);
  }, 0);

  const currency = items[0]?.currency || "INR";
  const currencySymbol =
    currency === "INR" ? "₹" : currency === "USD" ? "$" : "₹";

  const shippingThreshold = currency === "INR" ? 2000 : 30;
  const shippingFee =
    subtotal >= shippingThreshold ? 0 : currency === "INR" ? 99 : 5;
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
        <button className="cursor-pointer w-full flex items-center justify-center gap-2 py-4 bg-[#3b557e] text-white text-sm font-bold uppercase tracking-widest rounded-2xl hover:bg-[#2d4363] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl">
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

export default OrderSummary;
