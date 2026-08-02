import { useEffect } from "react";
import { Outlet, Navigate } from "react-router";
import { useOrder } from "../../hooks/useOrder";
import BuyerStatusNav from "../../components/BuyerStatusNav";

const MyOrder = () => {
  const { handleMyOrders } = useOrder();

  useEffect(() => {
    // Fetch all status buckets once on mount
    handleMyOrders("pending");
    handleMyOrders("delivered");
    handleMyOrders("cancelled");
    handleMyOrders("processing");
    handleMyOrders("shipped");
    handleMyOrders(); // all (no status = all)
  }, []);

  return (
    <div className="min-h-screen bg-[#F9F7F4]">
      <BuyerStatusNav />
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-8">
        <Outlet />
      </div>
    </div>
  );
};

export default MyOrder;
