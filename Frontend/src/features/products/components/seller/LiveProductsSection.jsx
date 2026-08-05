import React from "react";
import { useNavigate } from "react-router";
import { Package } from "lucide-react";
import LiveProductCard from "./LiveProductCard";

const LiveProductsSection = ({ liveProducts, draftsExist }) => {
  const navigate = useNavigate();

  return (
    <section className="space-y-4">
      {liveProducts.length > 0 && (
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-emerald-100 rounded-lg flex items-center justify-center">
            <Package size={14} className="text-emerald-600" strokeWidth={2} />
          </div>
          <div>
            <h3 className="text-sm font-extrabold text-[#1a1a1a] uppercase tracking-widest">
              Live Products
            </h3>
            <p className="text-[10px] text-slate-400 font-medium">
              Products with at least one variant and available to buyers.
            </p>
          </div>
          <span className="ml-auto bg-emerald-100 text-emerald-700 text-[10px] font-black px-2.5 py-1 rounded-full">
            {liveProducts.length}
          </span>
        </div>
      )}

      {liveProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {liveProducts.map((product) => (
            <LiveProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : !draftsExist ? (
        /* Empty state — no products at all */
        <div className="flex flex-col items-center justify-center py-20 px-6 bg-white rounded-[32px] border border-dashed border-slate-200 space-y-6">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300">
            <Package size={40} strokeWidth={1} />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-lg font-bold text-[#1a1a1a]">
              Your Atelier is Empty
            </h3>
            <p className="text-sm text-slate-500 max-w-xs mx-auto">
              Start showcasing your craft to the world by creating your first
              product listing.
            </p>
          </div>
          <button
            onClick={() => navigate("/seller/create-product")}
            className="bg-[#3b557e] text-white px-8 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-[#3b557e]/20 hover:-translate-y-1 transition-all cursor-pointer"
          >
            Launch First Product
          </button>
        </div>
      ) : (
        /* Drafts exist but no live products yet */
        <div className="flex flex-col items-center justify-center py-12 px-6 bg-white rounded-[32px] border border-dashed border-slate-200 space-y-3">
          <p className="text-sm font-bold text-slate-400">No live products yet</p>
          <p className="text-[11px] text-slate-400 max-w-xs text-center">
            Complete your drafts above by adding variants to publish them.
          </p>
        </div>
      )}
    </section>
  );
};

export default LiveProductsSection;
