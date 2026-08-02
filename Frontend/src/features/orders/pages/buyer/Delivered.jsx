import { useSelector } from "react-redux";
import OrderList from "../../components/OrderList";

const Delivered = () => {
  const orders = useSelector((state) => state.order.buyerOrders.delivered);
  const loading = useSelector((state) => state.order.loading);

  return (
    <OrderList
      orders={orders}
      loading={loading}
      emptyLabel="No delivered orders"
    />
  );
};

export default Delivered;
