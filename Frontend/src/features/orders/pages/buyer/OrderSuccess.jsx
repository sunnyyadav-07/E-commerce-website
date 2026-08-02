import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  CheckCircle2,
  ShoppingBag,
  ClipboardList,
  Sparkles,
} from "lucide-react";

/* ── Animated tick ring ─────────────────────────────────────── */
const SuccessRing = () => (
  <div className="relative flex items-center justify-center">
    {/* Outer pulse ring */}
    <span className="absolute w-40 h-40 rounded-full bg-emerald-100 animate-ping opacity-30" />
    <span className="absolute w-32 h-32 rounded-full bg-emerald-100 animate-pulse opacity-50" />

    {/* Inner circle */}
    <div className="relative z-10 w-28 h-28 rounded-full bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-2xl shadow-emerald-200">
      <CheckCircle2 className="w-14 h-14 text-white drop-shadow-lg" strokeWidth={2} />
    </div>

    {/* Sparkle accents */}
    <Sparkles className="absolute -top-2 -right-3 w-6 h-6 text-emerald-400 animate-bounce" />
    <Sparkles className="absolute -bottom-1 -left-2 w-4 h-4 text-teal-400 animate-bounce [animation-delay:0.3s]" />
  </div>
);



/* ── Main Page ──────────────────────────────────────────────── */
const OrderSuccess = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  // Trigger entrance animation on mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-linear-to-b from-white to-stone-50">
      <div
        className={`
          flex flex-col items-center gap-8 max-w-md w-full text-center
          transition-all duration-700 ease-out
          ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
        `}
      >
        {/* ── Success icon ── */}
        <SuccessRing />

        {/* ── Heading ── */}
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-black text-stone-900 leading-tight tracking-tight">
            Order Placed{" "}
            <span className="bg-linear-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Successfully!
            </span>
          </h1>
          <p className="text-sm text-stone-400 leading-relaxed max-w-xs mx-auto">
            🎉 Woohoo! Your order is confirmed and will be on its way soon.
            We'll notify you once it's shipped.
          </p>
        </div>

        {/* ── Divider ── */}
        <div className="w-full border-t border-stone-100" />

        {/* ── Action buttons ── */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          {/* Continue Shopping */}
          <button
            id="continue-shopping-btn"
            onClick={() => navigate("/")}
            className="
              cursor-pointer flex items-center justify-center gap-2
              flex-1 px-6 py-3.5
              rounded-2xl border-2 border-stone-200
              text-xs font-bold uppercase tracking-widest text-stone-700
              hover:bg-stone-100 hover:border-stone-300
              active:scale-95 transition-all duration-200
            "
          >
            <ShoppingBag className="w-4 h-4" />
            Continue Shopping
          </button>

          {/* View Order Details */}
          <button
            id="view-order-details-btn"
            onClick={() => navigate(`/order/${orderId}`)}
            className="
              cursor-pointer flex items-center justify-center gap-2
              flex-1 px-6 py-3.5
              rounded-2xl
              bg-linear-to-r from-[#3b557e] to-[#2d4363]
              text-xs font-bold uppercase tracking-widest text-white
              hover:from-[#2d4363] hover:to-[#1e2e45]
              active:scale-95 transition-all duration-200
              shadow-lg shadow-[#3b557e]/30 hover:shadow-xl hover:shadow-[#3b557e]/40
            "
          >
            <ClipboardList className="w-4 h-4" />
            View Order Details
          </button>
        </div>


      </div>
    </div>
  );
};

export default OrderSuccess;
