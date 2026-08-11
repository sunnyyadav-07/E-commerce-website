import { useSelector } from "react-redux";
import OrderList from "../../components/OrderList";

const Pending = () => {
  const orders = useSelector((state) => state.order.buyerOrders.pending);
  const loading = useSelector((state) => state.order.buyerLoading.pending);

  return (
    <OrderList
      orders={orders}
      loading={loading}
      emptyLabel="No pending orders"
    />
  );
};

export default Pending;
