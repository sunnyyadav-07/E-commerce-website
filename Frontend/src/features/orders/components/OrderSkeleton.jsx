const OrderSkeleton = () => (
  <div className="bg-white rounded-2xl border border-stone-100 p-5 animate-pulse space-y-4">
    <div className="flex justify-between">
      <div className="h-3 w-32 bg-stone-200 rounded-full" />
      <div className="h-3 w-20 bg-stone-200 rounded-full" />
    </div>
    <div className="h-px bg-stone-100" />
    <div className="flex gap-4">
      <div className="w-20 h-24 bg-stone-100 rounded-xl" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-3/4 bg-stone-200 rounded-full" />
        <div className="h-3 w-1/2 bg-stone-100 rounded-full" />
        <div className="h-3 w-2/3 bg-stone-100 rounded-full" />
      </div>
    </div>
  </div>
);

export default OrderSkeleton;
