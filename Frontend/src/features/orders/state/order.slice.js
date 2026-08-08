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
    setOrdersAccordingToStatus: (state, action) => {
      const { itemId, orderId, status, updatedOrder } = action.payload;
      const items = state.sellerOrders.pending.filter(
        (item) => item.itemId !== itemId && item.orderId !== orderId,
      );
      if (items) state.sellerOrders.pending = items;
      if (status === "cancelled") {
        if (updatedOrder) state.sellerOrders.cancelled.push(updatedOrder);
      } else if (status === "processing") {
        if (updatedOrder) state.sellerOrders.processing.push(updatedOrder);
      }
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
export const {
  setError,
  setLoading,
  setSellerOrders,
  setBuyerOrders,
  setOrdersAccordingToStatus,
} = orderSlice.actions;
export default orderSlice.reducer;
