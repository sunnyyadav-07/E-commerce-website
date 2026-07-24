import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: {
      pending: [],
      cancelled: [],
      delivered: [],
      processing: [],
      shipped: [],
    },
    error: null,
    loading: false,
  },
  reducers: {
    setSellerOrders: (state, action) => {
      const { status, data } = action.payload;
      state.orders[status] = data;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});
export const { setError, setLoading, setSellerOrders } = orderSlice.actions;
export default orderSlice.reducer;
