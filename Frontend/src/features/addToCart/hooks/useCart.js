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
import toast from "react-hot-toast";

export const useCart = () => {
  const dispatch = useDispatch();

  async function handleAddToCart(data) {
    dispatch(setLoadingInCart(true));
    try {
      const res = await addToCart(data);
      const cart = await getAllCartProducts();
      dispatch(setCartProducts(cart.products));
      toast.success("Added to cart.");
      return res;
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      dispatch(setErrorInCart(errMsg));
      toast.error(errMsg);
    } finally {
      dispatch(setLoadingInCart(false));
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

      toast.success(
        quantity?.quantity > 0 ? "Quantity increased." : "Quantity decreased.",
      );
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      dispatch(setErrorInCart(errMsg));
      toast.error(errMsg);
    } finally {
      dispatch(setLoadingInCart(false));
    }
  }

  async function handleRemoveProduct(productId, variantId) {
    try {
      dispatch(setLoadingInCart(true));
      await removeProductFromCart(productId, variantId);
      dispatch(
        removeProduct({
          productId,
          variantId,
        }),
      );
      toast.success("Product removed successfully");
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      dispatch(setErrorInCart(errMsg));
      toast.error(errMsg);
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
