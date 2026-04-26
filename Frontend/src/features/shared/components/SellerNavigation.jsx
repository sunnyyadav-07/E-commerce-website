import React, { useState } from "react";
import { NavLink } from "react-router";
import {
  LayoutDashboard,
  Inbox,
  ClipboardList,
  Settings,
  Package,
  Menu,
  X
} from "lucide-react";

const SellerNavigation = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", to: "/seller/dashboard" },
    { icon: Inbox, label: "Inventory", to: "/seller/create-product" },
    { icon: ClipboardList, label: "Orders", to: "/seller/orders" },
    { icon: Settings, label: "Settings", to: "/seller/settings" },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed top-3 left-4 z-[60] p-2 bg-white rounded-xl shadow-sm border border-slate-100 text-slate-600 hover:text-[#3b557e] transition-colors"
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-[#1a1a1a]/20 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar (Desktop & Mobile) */}
      <nav className={`fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-slate-100 flex-col z-50 transition-transform duration-300 ease-in-out ${
        isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      } flex`}>
        {/* Brand / Logo */}
        <div className="h-20 flex items-center px-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-[#3b557e] to-[#2a3d5e] rounded-xl flex items-center justify-center text-white shadow-md shadow-[#3b557e]/20">
              <Package size={18} strokeWidth={2} />
            </div>
            <div>
              <h1 className="text-sm font-extrabold tracking-widest text-[#1a1a1a] uppercase">
                Atelier
              </h1>
              <p className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Seller Portal</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 py-6 px-4 flex flex-col gap-2">
          <p className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Main Menu</p>
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              onClick={() => setIsMobileOpen(false)} // Close on click for mobile
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-2xl transition-all cursor-pointer relative ${
                  isActive
                    ? "text-[#1a1a1a] bg-slate-50 shadow-sm border border-slate-100"
                    : "text-slate-500 hover:text-[#1a1a1a] hover:bg-slate-50/50"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#3b557e] rounded-r-full" />
                  )}
                  <item.icon size={20} strokeWidth={isActive ? 2.5 : 2} className={isActive ? "text-[#3b557e]" : ""} />
                  <span className={`text-sm tracking-wide ${isActive ? "font-bold" : "font-medium"}`}>
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
};

export default SellerNavigation;

