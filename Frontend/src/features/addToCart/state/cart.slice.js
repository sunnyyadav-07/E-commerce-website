import { createSlice, current } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    allCartProducts: [],
    error: null,
    loading: false,
  },
  reducers: {
    setCartProducts: (state, action) => {
      state.allCartProducts = action.payload;
    },
    setLoadingInCart: (state, action) => {
      state.loading = action.payload;
    },
    updateQuantityOfProduct: (state, action) => {
      const { productId, variantId, quantity } = action.payload;
      const item = state.allCartProducts.find(
        (item) => item.productId === productId && item.variantId === variantId,
      );
      if (item) {
        item.quantity = quantity;
      }
    },
    removeProduct: (state, action) => {
      const { productId, variantId } = action.payload;
      state.allCartProducts = state.allCartProducts.filter(
        (item) =>
          !(item.productId === productId && item.variantId === variantId),
      );
    },
    setErrorInCart: (state, action) => {
      state.error = action.payload;
    },
  },
});
export const {
  setCartProducts,
  setErrorInCart,
  setLoadingInCart,
  updateQuantityOfProduct,
  removeProduct,
} = cartSlice.actions;
export default cartSlice.reducer;
