import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slice/cartSlice";
import authSlice from "./slice/authSlice";
import wishlistSlice from "./slice/wishlistSlice";

export const store = configureStore({
  reducer: {
    cartInfo: cartSlice,
    auth: authSlice,
    wishlist: wishlistSlice,
  },
});

export default store;
