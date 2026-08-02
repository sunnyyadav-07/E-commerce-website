import { useDispatch } from "react-redux";
import {
  setBuyerOrders,
  setError,
  setLoading,
  setSellerOrders,
} from "../state/order.slice";
import {
  cancelPayment,
  createOrder,
  getSellersOrders,
  markedOrdersSeen,
  myOrders,
  orderDetails,
  verifyPayment,
} from "../service/order.api";
import toast from "react-hot-toast";

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
      dispatch(setLoading(true));
      const res = await getSellersOrders(status, isSeen);
      dispatch(setSellerOrders({ status: status, data: res.orders }));
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      dispatch(setError(errMsg));
    } finally {
      dispatch(setLoading(false));
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
  async function handleVerifypayment(data) {
    try {
      const res = await verifyPayment(data);
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
      dispatch(setLoading(true));
      const res = await myOrders(status);
      dispatch(setBuyerOrders({ status, data: res.orders }));
      return res.orders;
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
  };
};
