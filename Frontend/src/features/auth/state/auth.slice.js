import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  loading: true,
  error: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.error = null;
    },
    setUserAddress: (state, action) => {
      const address = action.payload;
      if (address) state.user.address = address;
    },
  },
});
export const { setUser, setError, setLoading, clearUser, setUserAddress } =
  authSlice.actions;
export default authSlice.reducer;
