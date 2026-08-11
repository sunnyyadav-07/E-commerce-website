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
    sellerLoading: {
      pending: true,
      cancelled: true,
      delivered: true,
      processing: true,
      shipped: true,
    },
    buyerOrders: {
      pending: [],
      cancelled: [],
      delivered: [],
      processing: [],
      shipped: [],
      all: [],
    },
    buyerLoading: {
      pending: true,
      cancelled: true,
      delivered: true,
      processing: true,
      shipped: true,
      all: true,
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
      const { itemId, status, updatedOrder } = action.payload;
      const items = state.sellerOrders.pending.filter(
        (item) => item.itemId !== itemId,
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
    setOrderOfBuyer: (state, action) => {
      const { itemId, updatedOrder } = action.payload;
      const items = state.buyerOrders.pending.filter(
        (item) => item.itemId !== itemId,
      );
      if (items) state.buyerOrders.pending = items;
      if (updatedOrder) state.buyerOrders.cancelled.push(updatedOrder);
      const allItems = state.buyerOrders.all.map((item) => {
        if (item.itemId === itemId) {
          item = updatedOrder;
        }
        return item;
      });
      state.buyerOrders.all = allItems;
    },
    setBuyerLoading: (state, action) => {
      const { status, value } = action.payload;
      const key = status ?? "all";
      state.buyerLoading[key] = value;
    },
    setSellerLoading: (state, action) => {
      const { status, value } = action.payload;
      state.sellerLoading[status] = value;
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
  setBuyerLoading,
  setSellerLoading,
  setSellerOrders,
  setBuyerOrders,
  setOrdersAccordingToStatus,
  setOrderOfBuyer,
} = orderSlice.actions;
export default orderSlice.reducer;
