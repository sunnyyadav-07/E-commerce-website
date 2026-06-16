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
    setWishListLoading: (state, action) => {
      state.loading = action.payload;
    },
    setWishListError: (state, action) => {
      state.error = action.payload;
    },
    removeItemFromWishList: (state, action) => {
      const { productId, variantId } = action.payload;
      const items = state.allWishListItem.filter(
        (item) =>
          !(item.productId === productId && item.variantId === variantId),
      );
      if (item) {
        state.allWishListItem = items;
      }
    },
  },
});
export const {
  setWishListError,
  setWishListLoading,
  setWishlistItems,
  removeItemFromWishList,
} = wishListSlice.actions;
export default wishListSlice.reducer;
