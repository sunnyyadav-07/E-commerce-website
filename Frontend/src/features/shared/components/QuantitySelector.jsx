/**
 * QuantitySelector — shared reusable component
 *
 * Props:
 *  - value    {number}   current quantity
 *  - onChange {function} called with new quantity
 *  - max      {number}   maximum allowed (usually stock)
 *  - min      {number}   minimum allowed (default 1)
 *  - showMax  {boolean}  show "N available" label (default true)
 */
const QuantitySelector = ({ value, onChange, max, min = 1, showMax = true }) => {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-3">
        Quantity
      </p>
      <div className="flex items-center gap-4">
        {/* Decrement */}
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="cursor-pointer w-10 h-10 rounded-xl border-2 border-stone-200 flex items-center justify-center text-stone-700 text-lg font-bold hover:border-stone-900 hover:bg-stone-100 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          −
        </button>

        {/* Count */}
        <span className="w-8 text-center text-base font-bold text-stone-900">
          {value}
        </span>

        {/* Increment */}
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="cursor-pointer w-10 h-10 rounded-xl border-2 border-stone-200 flex items-center justify-center text-stone-700 text-lg font-bold hover:border-stone-900 hover:bg-stone-100 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          +
        </button>

        {/* Available label */}
        {showMax && (
          <span className="text-[11px] text-stone-400 uppercase tracking-widest">
            {max} available
          </span>
        )}
      </div>
    </div>
  );
};

export default QuantitySelector;
