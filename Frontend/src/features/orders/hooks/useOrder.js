import { useDispatch } from "react-redux";
import { setError, setLoading, setSellerOrders } from "../state/order.slice";
import {
  createOrder,
  getSellersOrders,
  markedOrdersSeen,
} from "../service/order.api";

export const useOrder = () => {
  const dispatch = useDispatch();
  async function handleCreateOrder(order) {
    try {
      dispatch(setLoading(true));
      const res = await createOrder(order);
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
  return { handleCreateOrder, handleGetSellerOrders, handleMarkeOrdersSeen };
};
