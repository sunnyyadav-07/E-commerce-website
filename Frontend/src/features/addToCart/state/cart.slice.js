import { createSlice } from "@reduxjs/toolkit";

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
      console.log(quantity);
      const item = state.allCartProducts.find(
        (item) => item.productId === productId && item.variantId === variantId,
      );
      console.log(item);
      if (item) {
        item.quantity = quantity;
      }
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
} = cartSlice.actions;
export default cartSlice.reducer;
