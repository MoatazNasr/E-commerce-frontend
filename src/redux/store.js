import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "./filtersSlice";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import wishlistReducer from "./wishlistSlice";
import errorMessageReducer from "./errorMessageSlice";
import successfulMessageReducer from "./successfulMessageSlice";
export default configureStore({
  reducer: {
    filters: filtersReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    user: userReducer,
    errorMessage: errorMessageReducer,
    successfulMessage: successfulMessageReducer,
  },
});
