import { useSelector } from "react-redux";
import OrderList from "../../components/OrderList";

const Cancelled = () => {
  const orders = useSelector((state) => state.order.buyerOrders.cancelled);
  const loading = useSelector((state) => state.order.loading);

  return (
    <OrderList
      orders={orders}
      loading={loading}
      emptyLabel="No cancelled orders"
    />
  );
};

export default Cancelled;
