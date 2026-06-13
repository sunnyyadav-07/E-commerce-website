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
    addProduct: (state, action) => {
      const newProduct = action.payload;

      const existingItem = state.allCartProducts.find(
        (item) =>
          item.productId === newProduct.productId &&
          item.variantId === newProduct.variantId,
      );

      if (existingItem) {
        existingItem.quantity += newProduct.quantity;
      } else {
        state.allCartProducts.push(newProduct);
      }
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
  addProduct,
} = cartSlice.actions;
export default cartSlice.reducer;
