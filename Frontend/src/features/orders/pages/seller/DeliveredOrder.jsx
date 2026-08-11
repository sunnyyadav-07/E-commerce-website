import { CheckCircle2 } from "lucide-react";
import OrderCard from "../../components/OrderCard";
import OrderSkeleton from "../../components/OrderSkeleton";
import { useSelector } from "react-redux";

/* ── empty state ── */
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-24 gap-4">
    <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center">
      <CheckCircle2 className="w-7 h-7 text-stone-300" />
    </div>
    <p className="text-sm font-bold text-stone-500 uppercase tracking-widest">
      No delivered orders
    </p>
    <p className="text-xs text-stone-400">Fulfilled orders will appear here</p>
  </div>
);

const DeliveredOrder = () => {
  const loading = useSelector((state) => state.order.sellerLoading.delivered);
  const deliveredOrders = useSelector((state) => state.order.sellerOrders.delivered);
  return (
    <div className="max-w-5xl mx-auto px-6 md:px-10 py-8">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center ring-1 ring-emerald-100">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
        </div>
        <div>
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-stone-900">
            Completed Orders
          </h2>
          {!loading && (
            <p className="text-[10px] text-stone-400 tracking-wider mt-0.5">
              {deliveredOrders?.length} order
              {deliveredOrders?.length !== 1 ? "s" : ""} fulfilled
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
      ) : deliveredOrders?.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="space-y-4">
          {deliveredOrders?.map((order) => (
            <OrderCard key={order.itemId ?? order.orderId} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DeliveredOrder;
