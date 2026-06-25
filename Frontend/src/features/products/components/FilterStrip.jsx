import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";

const FILTERS = ["All"];

const FilterStrip = ({ totalCount = 0 }) => {
  const [active, setActive] = useState("All");

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 mb-10">
      <div className="flex items-center justify-between border-t border-b border-stone-200 py-4">
        {/* Filter tabs */}
        <div className="flex gap-1 flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`cursor-pointer px-4 py-1.5 text-[11px] uppercase tracking-widest font-semibold rounded-full transition-all duration-200 ${
                active === f
                  ? "bg-[#3b557e] text-white shadow-sm"
                  : "text-stone-400 hover:text-stone-700 hover:bg-stone-100"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Right — item count + sort */}
        <div className="flex items-center gap-4">
          <span className="text-xs text-stone-400 hidden sm:block">
            {totalCount} items
          </span>
          <button className="cursor-pointer hidden sm:flex items-center gap-1.5 text-[11px] uppercase tracking-widest font-semibold text-stone-500 hover:text-stone-900 transition-colors border border-stone-200 rounded-xl px-3 py-1.5 hover:border-stone-400">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Sort
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterStrip;
