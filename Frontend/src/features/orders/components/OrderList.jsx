import { Package } from "lucide-react";
import BuyerOrderCard from "./BuyerOrderCard";
import OrderSkeleton from "./OrderSkeleton";

/**
 * OrderList — renders a list of buyer orders with loading / empty states.
 *
 * Props:
 *  orders  — array of order objects from Redux
 *  loading — boolean
 *  emptyLabel — string shown when list is empty
 */
const OrderList = ({ orders = [], loading = false, emptyLabel = "No orders found" }) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((n) => (
          <OrderSkeleton key={n} />
        ))}
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-stone-100 flex items-center justify-center">
          <Package className="w-7 h-7 text-stone-300" />
        </div>
        <p className="text-sm font-bold text-stone-400 uppercase tracking-widest">
          {emptyLabel}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <BuyerOrderCard key={order._id} order={order} />
      ))}
    </div>
  );
};

export default OrderList;
