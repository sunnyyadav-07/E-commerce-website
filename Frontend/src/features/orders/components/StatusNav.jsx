import { NavLink, Link } from "react-router";
import {
  Clock,
  CheckCircle2,
  XCircle,
  LayoutDashboard,
  ChevronLeft,
} from "lucide-react";

const TABS = [
  { label: "Pending", to: "/seller/order/pending", icon: Clock },
  { label: "Delivered", to: "/seller/order/delivered", icon: CheckCircle2 },
  { label: "Cancelled", to: "/seller/order/cancelled", icon: XCircle },
];

const StatusNav = () => {
  return (
    <div className="bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
        {/* Left — back button + title */}
        <div className="flex items-center gap-3">
          <Link
            to="/seller/dashboard"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-widest bg-[#3b557e]/10 text-[#3b557e] ring-1 ring-[#3b557e]/20 hover:bg-[#3b557e] hover:text-white transition-all duration-200 select-none group"
          >
            <ChevronLeft className="w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5" />
            <LayoutDashboard className="w-3.5 h-3.5 shrink-0" />
            Dashboard
          </Link>
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-stone-900">
            Orders
          </p>
        </div>

        {/* Right — pill tab group */}
        <nav
          className="flex items-center gap-1 bg-stone-100 rounded-2xl p-1"
          aria-label="Order status"
        >
          {TABS.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                [
                  "flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all duration-200 select-none",
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

export default StatusNav;
