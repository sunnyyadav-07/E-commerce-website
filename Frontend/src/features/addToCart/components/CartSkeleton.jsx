/* ── Cart Item Skeleton ───────────────────────────────────── */
export const CartItemSkeleton = () => (
  <div className="flex gap-5 p-5 animate-pulse">
    <div className="w-24 h-28 rounded-2xl bg-stone-200 shrink-0" />
    <div className="flex-1 space-y-3 pt-1">
      <div className="h-3 bg-stone-200 rounded-full w-3/5" />
      <div className="h-3 bg-stone-200 rounded-full w-2/5" />
      <div className="h-3 bg-stone-200 rounded-full w-1/4 mt-4" />
      <div className="flex items-center gap-3 mt-4">
        <div className="h-9 w-28 bg-stone-200 rounded-xl" />
        <div className="h-9 w-9 bg-stone-200 rounded-xl" />
      </div>
    </div>
  </div>
);

/* ── Cart Summary Skeleton ────────────────────────────────── */
export const CartSummarySkeleton = () => (
  <div className="bg-white rounded-3xl border border-stone-100 shadow-sm p-6 space-y-4 animate-pulse">
    <div className="h-3 bg-stone-200 rounded-full w-2/5" />
    <div className="h-3 bg-stone-200 rounded-full w-full" />
    <div className="h-3 bg-stone-200 rounded-full w-full" />
    <div className="h-3 bg-stone-200 rounded-full w-3/4 mt-2" />
    <div className="h-14 bg-stone-200 rounded-2xl mt-4" />
  </div>
);
