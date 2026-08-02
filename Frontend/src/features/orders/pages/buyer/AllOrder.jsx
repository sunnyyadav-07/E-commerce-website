import { useSelector } from "react-redux";
import OrderList from "../../components/OrderList";

const AllOrder = () => {
  const buyerOrders = useSelector((state) => state.order.buyerOrders);
  const loading = useSelector((state) => state.order.loading);

  // Use the dedicated "all" bucket if populated; otherwise merge all status slices
  const orders =
    buyerOrders.all?.length > 0
      ? buyerOrders.all
      : [
          ...buyerOrders.pending,
          ...buyerOrders.processing,
          ...buyerOrders.shipped,
          ...buyerOrders.delivered,
          ...buyerOrders.cancelled,
        ];

  return (
    <OrderList
      orders={orders}
      loading={loading}
      emptyLabel="You haven't placed any orders yet"
    />
  );
};

export default AllOrder;
