import { useSelector } from "react-redux";
import { Clock } from "lucide-react";
import OrderCard from "../components/OrderCard";
import OrderSkeleton from "../components/OrderSkeleton";

/* ── empty state ── */
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-24 gap-4">
    <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center">
      <Clock className="w-7 h-7 text-stone-300" />
    </div>
    <p className="text-sm font-bold text-stone-500 uppercase tracking-widest">
      No pending orders
    </p>
    <p className="text-xs text-stone-400">New orders will appear here</p>
  </div>
);

/* ── page ── */
const PendingOrder = () => {
  const loading = useSelector((state) => state.order.loading);
  const pendingOrders = useSelector((state) => state.order.orders.pending);

  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 py-8">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center ring-1 ring-amber-100">
          <Clock className="w-4 h-4 text-amber-500" />
        </div>
        <div>
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-stone-900">
            Pending Orders
          </h2>
          {!loading && (
            <p className="text-[10px] text-stone-400 tracking-wider mt-0.5">
              {pendingOrders.length} order
              {pendingOrders.length !== 1 ? "s" : ""} awaiting fulfilment
            </p>
          )}
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((n) => (
            <OrderSkeleton key={n} />
          ))}
        </div>
      ) : pendingOrders.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-4">
          {pendingOrders.map((order) => (
            <OrderCard
              key={order.itemId ?? order.orderId}
              order={order}
              actions={
                <>
                  <button className="px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-widest bg-red-50 text-red-500 ring-1 ring-red-100 hover:bg-red-100 hover:ring-red-200 transition-all duration-150">
                    Reject
                  </button>
                  <button className="px-3 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-widest bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100 hover:bg-emerald-100 hover:ring-emerald-200 transition-all duration-150">
                    Accept
                  </button>
                </>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingOrder;
