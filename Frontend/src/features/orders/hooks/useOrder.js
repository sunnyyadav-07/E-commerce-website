import { useDispatch } from "react-redux";
import {
  setBuyerOrders,
  setBuyerLoading,
  setError,
  setLoading,
  setOrderOfBuyer,
  setOrdersAccordingToStatus,
  setSellerOrders,
  setSellerLoading,
} from "../state/order.slice";
import {
  cancelOrderBybuyer,
  cancelPayment,
  changeStatusOfOrder,
  createOrder,
  getSellersOrders,
  markedOrdersSeen,
  myOrders,
  orderDetails,
  verifyPayment,
} from "../service/order.api";
import toast from "react-hot-toast";
import { clearCart } from "../../addToCart/state/cart.slice";

export const useOrder = () => {
  const dispatch = useDispatch();
  async function handleCreateOrder(order) {
    try {
      dispatch(setLoading(true));
      const res = await createOrder(order);
      return res.order;
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      dispatch(setError(errMsg));
    } finally {
      dispatch(setLoading(false));
    }
  }
  async function handleGetSellerOrders(status, isSeen) {
    try {
      dispatch(setSellerLoading({ status, value: true }));
      const res = await getSellersOrders(status, isSeen);
      dispatch(setSellerOrders({ status: status, data: res.orders }));
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      dispatch(setError(errMsg));
    } finally {
      dispatch(setSellerLoading({ status, value: false }));
    }
  }
  async function handleMarkeOrdersSeen() {
    try {
      dispatch(setLoading(true));
      const res = await markedOrdersSeen();
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      dispatch(setError(errMsg));
    } finally {
      dispatch(setLoading(false));
    }
  }
  async function handleVerifypayment(data, isFromCart = false) {
    try {
      const res = await verifyPayment(data);
      if (isFromCart) dispatch(clearCart());
      toast.success("Payment successful");
      return res;
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      dispatch(setError(errMsg));
    }
  }
  async function handlecancelPayment(orderId) {
    try {
      toast.error("You cancelled the payment");
      const res = await cancelPayment(orderId);
      return res;
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      dispatch(setError(errMsg));
    }
  }
  async function handleOrderDetails(orderId) {
    try {
      dispatch(setLoading(true));
      const res = await orderDetails(orderId);
      return res.order;
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      dispatch(setError(errMsg));
    } finally {
      dispatch(setLoading(false));
    }
  }
  async function handleMyOrders(status) {
    try {
      dispatch(setBuyerLoading({ status, value: true }));
      const res = await myOrders(status);
      dispatch(setBuyerOrders({ status, data: res.orders }));
      return res.orders;
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      dispatch(setError(errMsg));
    } finally {
      dispatch(setBuyerLoading({ status, value: false }));
    }
  }
  async function handleAcceptOrder(orderId, itemId, status) {
    try {
      dispatch(setLoading(true));
      const res = await changeStatusOfOrder(orderId, itemId, status);
      dispatch(
        setOrdersAccordingToStatus({
          itemId,
          status,
          updatedOrder: res.updatedOrder,
        }),
      );
      toast.success("Order accepted successfully");
      return res;
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      dispatch(setError(errMsg));
    } finally {
      dispatch(setLoading(false));
    }
  }
  async function handleRejectOrder(orderId, itemId, status) {
    try {
      dispatch(setLoading(true));
      const res = await changeStatusOfOrder(orderId, itemId, status);
      dispatch(
        setOrdersAccordingToStatus({
          itemId,
          status,
          updatedOrder: res.updatedOrder,
        }),
      );
      toast.success("Order cancelled successfully");
      return res;
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      dispatch(setError(errMsg));
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleCancelOrderByBuyer(orderId, itemId) {
    try {
      dispatch(setLoading(true));
      const res = await cancelOrderBybuyer(orderId, itemId);
      dispatch(
        setOrderOfBuyer({
          itemId,
          updatedOrder: res.updatedOrder,
        }),
      );
      toast.success("Order cancelled successfully");
      return res;
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      dispatch(setError(errMsg));
    } finally {
      dispatch(setLoading(false));
    }
  }

  return {
    handleCreateOrder,
    handleGetSellerOrders,
    handleMarkeOrdersSeen,
    handleVerifypayment,
    handlecancelPayment,
    handleOrderDetails,
    handleMyOrders,
    handleAcceptOrder,
    handleRejectOrder,
    handleCancelOrderByBuyer,
  };
};
