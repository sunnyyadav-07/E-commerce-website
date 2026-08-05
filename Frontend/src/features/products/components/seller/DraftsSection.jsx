import React from "react";
import { FilePen } from "lucide-react";
import DraftProductCard from "./DraftProductCard";

const DraftsSection = ({ drafts }) => {
  if (drafts.length === 0) return null;

  return (
    <section className="space-y-4">
      {/* Section header */}
      <div className="flex items-center gap-3">
        <div className="w-7 h-7 bg-amber-100 rounded-lg flex items-center justify-center">
          <FilePen size={14} className="text-amber-600" strokeWidth={2} />
        </div>
        <div>
          <h3 className="text-sm font-extrabold text-[#1a1a1a] uppercase tracking-widest">
            Drafts
          </h3>
          <p className="text-[10px] text-slate-400 font-medium">
            These products need at least one variant before going live.
          </p>
        </div>
        <span className="ml-auto bg-amber-100 text-amber-700 text-[10px] font-black px-2.5 py-1 rounded-full">
          {drafts.length}
        </span>
      </div>

      {/* Draft cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {drafts.map((product) => (
          <DraftProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default DraftsSection;
