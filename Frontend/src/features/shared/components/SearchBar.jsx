import { useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router";
import { suggestProducts } from "../../search/service/suggestion.api";
import Suggestions from "../../search/components/Suggestions";

const SearchBar = ({ className = "relative hidden md:flex items-center", alwaysOpen = false, onOpen, onClose }) => {
  const navigate = useNavigate();

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);
  const timerRef = useRef(null);

  // Debounced fetch
  function fetchSuggestions(value) {
    clearTimeout(timerRef.current);
    if (!value.trim()) {
      setSuggestions([]);
      return;
    }
    timerRef.current = setTimeout(async () => {
      const data = await suggestProducts(value);
      setSuggestions(data);
    }, 300);
  }

  // Auto-focus when opened
  useEffect(() => {
    if (alwaysOpen) {
      setSearchOpen(true);
      return;
    }
    if (searchOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [searchOpen, alwaysOpen]);



  function close() {
    setSearchOpen(false);
    setSearchQuery("");
    setSuggestions([]);
    onClose?.();
  }

  // Hides the dropdown but keeps query + suggestions for when the user returns
  function collapse() {
    setSearchOpen(false);
    onClose?.();
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      close();
    }
    if (e.key === "Escape") {
      close();
    }
  };

  return (
    <div ref={wrapperRef} className={className}>
      {/* Expanding input */}
      {alwaysOpen ? (
        /* Mobile: inline flex, fills parent width */
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="flex items-center gap-1 bg-stone-100 rounded-xl px-3 py-1.5 w-full border border-stone-200 focus-within:border-[#3b557e] focus-within:ring-2 focus-within:ring-[#3b557e]/20 transition-all">
            <Search className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                fetchSuggestions(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search products…"
              className="bg-transparent text-[12px] text-stone-800 placeholder-stone-400 outline-none w-full"
            />
            {searchQuery && (
              <button
                onClick={() => { setSearchQuery(""); setSuggestions([]); }}
                className="text-stone-400 hover:text-stone-600 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Desktop: absolutely positioned so it floats left of the toggle, never displaces grid */
        <div
          style={{
            position: "absolute",
            right: "100%",
            top: "50%",
            transform: "translateY(-50%)",
            width: searchOpen ? "220px" : "0px",
            opacity: searchOpen ? 1 : 0,
            overflow: "hidden",
            transition: "width 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.2s ease",
            display: "flex",
            alignItems: "center",
            paddingRight: "6px",
          }}
        >
          <div className="flex items-center gap-1 bg-stone-100 rounded-xl px-3 py-1.5 w-full border border-stone-200 focus-within:border-[#3b557e] focus-within:ring-2 focus-within:ring-[#3b557e]/20 transition-all">
            <Search className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                fetchSuggestions(e.target.value);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search products…"
              className="bg-transparent text-[12px] text-stone-800 placeholder-stone-400 outline-none w-full"
            />
            {searchQuery && (
              <button
                onClick={() => { setSearchQuery(""); setSuggestions([]); }}
                className="text-stone-400 hover:text-stone-600 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Toggle button — hidden when alwaysOpen */}
      {!alwaysOpen && (
        <button
          onClick={() => {
            if (searchOpen) {
              close();
            } else {
              setSearchOpen(true);
              onOpen?.();
            }
          }}
          className="cursor-pointer flex items-center p-2 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors ml-1"
        >
          {searchOpen ? (
            <X className="w-4.5 h-4.5" />
          ) : (
            <Search className="w-4.5 h-4.5" />
          )}
        </button>
      )}

      {/* Suggestions dropdown */}
      {searchOpen && suggestions?.length > 0 && (
        <Suggestions
          items={suggestions}
          query={searchQuery}
          onSelect={collapse}
        />
      )}
    </div>
  );
};

export default SearchBar;
