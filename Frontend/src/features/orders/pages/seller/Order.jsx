import { Outlet } from "react-router";
import StatusNav from "../../components/StatusNav";
import { useOrder } from "../../hooks/useOrder";
import { useEffect } from "react";

const Order = () => {
  const { handleGetSellerOrders } = useOrder();
  useEffect(() => {
    const fetch = () => {
      handleGetSellerOrders("pending", true);
      handleGetSellerOrders("delivered", true);
      handleGetSellerOrders("cancelled", true);
    };
    fetch();
  }, []);
  return (
    <div>
      <StatusNav />
      <Outlet />
    </div>
  );
};

export default Order;
