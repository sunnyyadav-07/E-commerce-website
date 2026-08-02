import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    sellerOrders: {
      pending: [],
      cancelled: [],
      delivered: [],
      processing: [],
      shipped: [],
    },
    buyerOrders: {
      pending: [],
      cancelled: [],
      delivered: [],
      processing: [],
      shipped: [],
      all: [],
    },
    error: null,
    loading: false,
  },
  reducers: {
    setSellerOrders: (state, action) => {
      const { status, data } = action.payload;
      state.sellerOrders[status] = data;
    },
    setBuyerOrders: (state, action) => {
      const { status, data } = action.payload;
      if (status) {
        state.buyerOrders[status] = data;
      } else if (!status) {
        state.buyerOrders["all"] = data;
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});
export const { setError, setLoading, setSellerOrders, setBuyerOrders } =
  orderSlice.actions;
export default orderSlice.reducer;
