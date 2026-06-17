import { useDispatch } from "react-redux";
import {
  addToCart,
  getAllCartProducts,
  removeProductFromCart,
  updateProductQuantity,
} from "../services/cart.api";
import {
  removeProduct,
  setCartProducts,
  setErrorInCart,
  setLoadingInCart,
  updateQuantityOfProduct,
} from "../state/cart.slice";

export const useCart = () => {
  const dispatch = useDispatch();
  async function handleAddToCart(data) {
    try {
      const res = await addToCart(data);
      const cart = await getAllCartProducts();
      dispatch(setCartProducts(cart.products));
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
  async function handleUpdateProductQuantity(productId, variantId, quantity) {
    try {
      dispatch(setLoadingInCart(true));
      const res = await updateProductQuantity(productId, variantId, quantity);
      dispatch(
        updateQuantityOfProduct({
          productId,
          variantId,
          quantity: res.quantity,
        }),
      );
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      dispatch(setErrorInCart(errMsg));
    } finally {
      dispatch(setLoadingInCart(false));
    }
  }
  async function handleRemoveProduct(productId, variantId) {
    try {
      dispatch(setLoadingInCart(true));
      const res = await removeProductFromCart(productId, variantId);
      dispatch(
        removeProduct({
          productId,
          variantId,
        }),
      );
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
    handleUpdateProductQuantity,
    handleRemoveProduct,
  };
};
