import { useSelector } from "react-redux";
import OrderList from "../../components/OrderList";

const AllOrder = () => {
  const buyerOrders = useSelector((state) => state.order.buyerOrders.all);
  const loading = useSelector((state) => state.order.buyerLoading.all);

  const orders = buyerOrders;

  return (
    <OrderList
      orders={orders}
      loading={loading}
      emptyLabel="You haven't placed any orders yet"
    />
  );
};

export default AllOrder;
