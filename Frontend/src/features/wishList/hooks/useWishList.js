import { useDispatch } from "react-redux";
import {
  removeItemFromWishList,
  setWishListError,
  setWishlistItems,
  setWishListLoading,
} from "../state/wishlist.slice";
import {
  addToWishList,
  getAllWishListItems,
  removeFromWishList,
} from "../service/wishlist.api";
const userWishList = () => {
  const dispatch = useDispatch();
  async function handleAddToWishList(data) {
    try {
      dispatch(setWishListLoading(true));
      const res = await addToWishList(data);
      return res;
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      dispatch(setWishListError(errMsg));
    } finally {
      dispatch(setWishListLoading(false));
    }
  }

  async function handleGetAllWisgListItems() {
    try {
      dispatch(setWishListLoading(true));
      const res = await getAllWishListItems();
      dispatch(setWishlistItems(res.wishlist));
      return res;
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      dispatch(setWishListError(errMsg));
    } finally {
      dispatch(setWishListLoading(false));
    }
  }
  async function handleRemoveItemFromWishList(productId, variantId) {
    try {
      dispatch(setWishListLoading(true));
      const res = await removeFromWishList(productId, variantId);
      dispatch(removeItemFromWishList({ productId, variantId }));
      return res;
    } catch (error) {
      const errMsg = error.response?.data?.message || error.message;
      dispatch(setWishListError(errMsg));
    } finally {
      dispatch(setWishListLoading(false));
    }
  }

  return {
    handleAddToWishList,
    handleGetAllWisgListItems,
    handleRemoveItemFromWishList,
  };
};
