import { createSlice } from "@reduxjs/toolkit";
const productSlice = createSlice({
  name: "products",
  initialState: {
    sellerProducts: [],
  },
  reducers: {
    setSellerProduct: (state, action) => {
      state.sellerProducts = action.payload;
    },
  },
});

export const { setSellerProduct } = productSlice.actions;
export default productSlice.reducer;
