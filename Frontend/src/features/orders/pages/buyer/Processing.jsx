import { useSelector } from "react-redux";
import OrderList from "../../components/OrderList";

const Processing = () => {
  const orders = useSelector((state) => state.order.buyerOrders.processing);
  const loading = useSelector((state) => state.order.loading);

  return (
    <OrderList
      orders={orders}
      loading={loading}
      emptyLabel="No orders in processing"
    />
  );
};

export default Processing;
