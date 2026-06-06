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
    setErrorInCart: (state, action) => {
      state.error = action.payload;
    },
  },
});
export const { setCartProducts, setErrorInCart, setLoadingInCart } =
  cartSlice.actions;
export default cartSlice.reducer;
