import { Search, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";

const SearchHeader = ({ query, productCount }) => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors mb-4 group cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span className="text-sm font-medium">Back</span>
      </button>

      {/* Title row */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-6 border-b border-stone-200 gap-2">
        <div className="flex items-start gap-3">
          <Search className="w-5 h-5 text-stone-400 mt-1 shrink-0" />
          <div>
            <p className="text-xs text-stone-400 uppercase tracking-widest font-medium mb-0.5">
              Search results
            </p>
            <h1 className="text-3xl font-bold text-stone-900">
              {query ? (
                <>
                  &ldquo;
                  <span className="text-[#3b557e]">{query}</span>
                  &rdquo;
                </>
              ) : (
                "All Products"
              )}
            </h1>
            {productCount !== undefined && (
              <p className="text-sm text-stone-500 mt-1">{productCount} Products</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;
