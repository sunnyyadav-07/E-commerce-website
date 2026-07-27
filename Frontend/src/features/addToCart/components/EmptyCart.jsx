import { ShoppingBag, ShoppingCart } from "lucide-react";

/* ── Empty Cart State ─────────────────────────────────────── */
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

export default EmptyCart;
