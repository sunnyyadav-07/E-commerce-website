import React from "react";
import { Link } from "react-router";
import { ShoppingBag } from "lucide-react";
import SearchBar from "../../../shared/components/SearchBar";

const DashboardHeader = () => {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md pl-16 pr-6 py-4 md:px-6 flex items-center justify-end border-b border-slate-100">
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-[#3b557e] bg-[#3b557e]/8 hover:bg-[#3b557e]/15 border border-[#3b557e]/15 hover:border-[#3b557e]/30 font-semibold text-xs tracking-wide transition-all group"
        >
          <ShoppingBag size={15} className="group-hover:scale-110 transition-transform" />
          Browse Store
        </Link>

        <SearchBar />

        <div className="h-6 w-[1px] bg-slate-200 hidden sm:block"></div>

        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-[#1a1a1a] group-hover:text-[#3b557e] transition-colors">
              Alex Morgan
            </p>
          </div>
          <div className="w-9 h-9 rounded-full bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden group-hover:shadow-md transition-all">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
