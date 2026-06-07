import { useDispatch } from "react-redux";
import { addToCart, getAllCartProducts } from "../services/cart.api";
import {
  setCartProducts,
  setErrorInCart,
  setLoadingInCart,
} from "../state/cart.slice";

export const useCart = () => {
  const dispatch = useDispatch();
  async function handleAddToCart(data) {
    try {
      const res = await addToCart(data);
      return res;
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      dispatch(setErrorInCart(errMsg));
    }
  }
  async function handleGetAllCartProducts() {
    dispatch(setLoadingInCart(true));
    try {
      const res = await getAllCartProducts();
      dispatch(setCartProducts(res.products));
      return res.products;
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      dispatch(setErrorInCart(errMsg));
    } finally {
      dispatch(setLoadingInCart(false));
    }
  }
  return {
    handleAddToCart,
    handleGetAllCartProducts,
  };
};
