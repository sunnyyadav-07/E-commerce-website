import { createSlice } from "@reduxjs/toolkit";

const wishListSlice = createSlice({
  name: "wishlist",
  initialState: {
    allWishListItem: [],
    loading: false,
    error: null,
  },
  reducers: {
    setWishlistItems: (state, action) => {
      state.allWishListItem = action.payload;
    },
    clearWishlist: (state, action) => {
      state.allWishListItem = [];
    },
    setWishListLoading: (state, action) => {
      state.loading = action.payload;
    },
    setWishListError: (state, action) => {
      state.error = action.payload;
    },
    removeItemFromWishList: (state, action) => {
      const { productId, variantId } = action.payload;
      if (!productId || !variantId) return;
      const cart = state.allWishListItem.filter(
        (item) =>
          !(item.productId === productId && item.variantId === variantId),
      );
      if (cart) {
        state.allWishListItem = cart;
      }
    },
  },
});
export const {
  setWishListError,
  setWishListLoading,
  setWishlistItems,
  removeItemFromWishList,
  clearWishlist,
} = wishListSlice.actions;
export default wishListSlice.reducer;
