import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/state/auth.slice";
import productReducer from "../features/products/state/product.slice";
import cartReducer from "../features/addToCart/state/cart.slice";
import wishListReducer from "../features/wishList/state/wishlist.slice";
import catalogReducer from "../features/catalogs/state/catalog.slice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    cart: cartReducer,
    wishlist: wishListReducer,
    catalog: catalogReducer,
  },
});
