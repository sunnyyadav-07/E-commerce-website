import { useSelector } from "react-redux";
import OrderList from "../../components/OrderList";

const Shipped = () => {
  const orders = useSelector((state) => state.order.buyerOrders.shipped);
  const loading = useSelector((state) => state.order.loading);

  return (
    <OrderList
      orders={orders}
      loading={loading}
      emptyLabel="No shipped orders"
    />
  );
};

export default Shipped;
