import { createSlice } from "@reduxjs/toolkit";

const catalogSlice = createSlice({
  name: "catalog",
  initialState: {
    catalogProducts: [],
    error: null,
    loading: true,
  },
  reducers: {
    setCatalogProducts: (state, action) => {
      state.catalogProducts = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});
export const { setCatalogProducts, setError, setLoading } =
  catalogSlice.actions;
export default catalogSlice.reducer;
