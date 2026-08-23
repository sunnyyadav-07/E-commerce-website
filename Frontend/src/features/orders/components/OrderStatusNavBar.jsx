import { useState } from "react";
import { NavLink, Link, useLocation } from "react-router";
import { ChevronLeft, Menu, X } from "lucide-react";

/**
 * Shared order status nav bar for buyer and seller order pages.
 *
 * Props:
 *  - tabs        : [{ label, to, icon }]  — status tab definitions
 *  - backTo      : string                 — href for the back button
 *  - backLabel   : string                 — text inside the back button
 *  - BackIcon    : LucideIcon (optional)  — extra icon inside back button
 *  - title       : string                 — page title shown in the centre (mobile) / beside back btn (desktop)
 *  - TitleIcon   : LucideIcon (optional)  — icon shown beside the title
 */
const OrderStatusNavBar = ({
  tabs,
  backTo,
  backLabel,
  BackIcon,
  title,
  TitleIcon,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const activeTab = tabs.find((t) => t.to === location.pathname);

  const BackButton = (
    <Link
      to={backTo}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-widest bg-[#3b557e]/10 text-[#3b557e] ring-1 ring-[#3b557e]/20 hover:bg-[#3b557e] hover:text-white transition-all duration-200 select-none group z-10"
    >
      <ChevronLeft className="w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5" />
      {BackIcon && <BackIcon className="w-3.5 h-3.5 shrink-0" />}
      {backLabel}
    </Link>
  );

  const Title = (
    <div className="flex items-center gap-1.5">
      {TitleIcon && <TitleIcon className="w-3.5 h-3.5 text-stone-400" />}
      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-stone-900">
        {title}
      </p>
    </div>
  );

  const TabNav = ({ className = "" }) => (
    <nav
      className={`flex items-center gap-0.5 bg-stone-100 rounded-2xl p-1 overflow-x-auto no-scrollbar ${className}`}
      aria-label="Order status filter"
    >
      {tabs.map(({ label, to, icon: Icon }) => (
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
  );

  return (
    <div className="bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm sticky top-0 z-40">
      {/* ── Desktop bar ── */}
      <div className="hidden md:flex max-w-5xl mx-auto px-8 h-14 items-center justify-between gap-4">
        <div className="flex items-center gap-3 shrink-0">
          {BackButton}
          {Title}
        </div>
        <TabNav />
      </div>

      {/* ── Mobile bar ── */}
      <div className="md:hidden relative px-4 h-14 flex items-center justify-between">
        {/* Left — back button */}
        {BackButton}

        {/* Centre — title (absolutely positioned so it's always centred) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {Title}
        </div>

        {/* Right — hamburger toggle */}
        <button
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-stone-100 text-stone-600 hover:bg-stone-200 transition-all duration-200 z-10"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle order status menu"
        >
          {menuOpen ? (
            <X className="w-4 h-4" />
          ) : (
            <>
              <Menu className="w-4 h-4" />
              {activeTab && (
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#3b557e]">
                  {activeTab.label}
                </span>
              )}
            </>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-stone-100 bg-white/98 backdrop-blur-md px-4 py-3 flex flex-col gap-1 animate-in slide-in-from-top-2 duration-200">
          {tabs.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                [
                  "flex items-center gap-3 px-4 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-widest transition-all duration-200 select-none",
                  isActive
                    ? "bg-[#3b557e] text-white shadow-sm shadow-[#3b557e]/20"
                    : "text-stone-500 hover:text-stone-800 hover:bg-stone-100",
                ].join(" ")
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={[
                      "w-4 h-4 shrink-0 transition-colors duration-200",
                      isActive ? "text-white" : "text-stone-400",
                    ].join(" ")}
                  />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderStatusNavBar;
