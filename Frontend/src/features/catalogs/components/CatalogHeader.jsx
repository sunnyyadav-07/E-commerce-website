import React from "react";
import { SlidersHorizontal, ChevronDown, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

const CatalogHeader = ({ title, productCount }) => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Back Navigation */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors mb-4 group cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span className="text-sm font-medium">Back</span>
      </button>

      <div className="flex flex-col md:flex-row justify-between items-center py-6 border-b border-stone-200 gap-4">
      <div>
        <h1 className="text-3xl font-bold text-stone-900 capitalize">{title || "Catalog"}</h1>
        {productCount !== undefined && (
          <p className="text-sm text-stone-500 mt-1">{productCount} Products</p>
        )}
      </div>
      
      <div className="flex items-center gap-4 w-full md:w-auto">
        <button className="md:hidden flex items-center justify-center gap-2 flex-1 py-3 border border-stone-300 rounded-xl text-stone-700 font-medium">
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </button>
        
        <div className="relative flex-1 md:flex-none">
          <select className="appearance-none w-full md:w-48 py-3 pl-4 pr-10 border border-stone-300 rounded-xl bg-white text-stone-700 font-medium focus:outline-none focus:ring-2 focus:ring-stone-500 cursor-pointer">
            <option value="featured">Featured</option>
            <option value="newest">Newest Arrivals</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500 pointer-events-none" />
        </div>
      </div>
    </div>
    </div>
  );
};

export default CatalogHeader;
