import { NavLink, Link } from "react-router";
import {
  Clock,
  CheckCircle2,
  XCircle,
  Truck,
  RotateCcw,
  LayoutList,
  ChevronLeft,
  ShoppingBag,
} from "lucide-react";

const TABS = [
  { label: "All", to: "/my-orders/all-order", icon: LayoutList },
  { label: "Pending", to: "/my-orders/pending", icon: Clock },
  { label: "Processing", to: "/my-orders/processing", icon: RotateCcw },
  { label: "Shipped", to: "/my-orders/shipped", icon: Truck },
  { label: "Delivered", to: "/my-orders/delivered", icon: CheckCircle2 },
  { label: "Cancelled", to: "/my-orders/cancelled", icon: XCircle },
];

const BuyerStatusNav = () => {
  return (
    <div className="bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 md:px-8 h-14 flex items-center justify-between gap-4">
        {/* Left — back + title */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-widest bg-[#3b557e]/10 text-[#3b557e] ring-1 ring-[#3b557e]/20 hover:bg-[#3b557e] hover:text-white transition-all duration-200 select-none group"
          >
            <ChevronLeft className="w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5" />
            Home
          </Link>
          <div className="flex items-center gap-1.5">
            <ShoppingBag className="w-3.5 h-3.5 text-stone-400" />
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-stone-900">
              My Orders
            </p>
          </div>
        </div>

        {/* Right — tab group (scrollable on mobile) */}
        <nav
          className="flex items-center gap-0.5 bg-stone-100 rounded-2xl p-1 overflow-x-auto no-scrollbar"
          aria-label="Order status filter"
        >
          {TABS.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                [
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-200 select-none whitespace-nowrap",
                  isActive
                    ? "bg-[#3b557e] text-white shadow-sm shadow-[#3b557e]/20"
                    : "text-stone-500 hover:text-stone-800 hover:bg-stone-200/60",
                ].join(" ")
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={[
                      "w-3.5 h-3.5 shrink-0 transition-colors duration-200",
                      isActive ? "text-white" : "text-stone-400",
                    ].join(" ")}
                  />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default BuyerStatusNav;
