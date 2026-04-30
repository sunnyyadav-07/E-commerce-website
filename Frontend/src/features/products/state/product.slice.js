import { createSlice } from "@reduxjs/toolkit";
const productSlice = createSlice({
  name: "products",
  initialState: {
    sellerProducts: [],
    allProducts: [],
    loading: true,
    error: null,
  },
  reducers: {
    setSellerProduct: (state, action) => {
      state.sellerProducts = action.payload;
    },
    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setSellerProduct, setAllProducts, setError, setLoading } =
  productSlice.actions;
export default productSlice.reducer;
