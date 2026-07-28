import {
  ShieldCheck,
  RotateCcw,
  Package,
  Zap,
  ArrowRight,
  ChevronLeft,
} from "lucide-react";
import { usePayment } from "../../orders/hooks/usePayment";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

/* ── Order Summary Panel ─────────────────────────────────── */
const OrderSummary = ({ items, onContinueShopping }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const { initiatePayment } = usePayment();
  function handleCheckout() {
    const itemsDetails = items.map((item) => {
      return {
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
      };
    });
    initiatePayment(user, itemsDetails);
  }
  const subtotal = items?.reduce((acc, item) => {
    const price = item?.price;
    return acc + price * (item?.quantity || 1);
  }, 0);

  const currency = items[0]?.currency || "INR";
  const currencySymbol =
    currency === "INR" ? "₹" : currency === "USD" ? "$" : "₹";

  const total = subtotal;
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
          onClick={() => {
            if (user.address) {
              handleCheckout();
            } else {
              navigate("/checkout/address");
            }
          }}
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

export default OrderSummary;
