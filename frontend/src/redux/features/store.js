import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "../api/apiSlice";
import authReducer from "./auth/authSlice";

// Get the reducer and middleware from the apiSlice
const { reducer: apiReducer, middleware: apiMiddleware } = apiSlice;

const store = configureStore({
  reducer: {
    // Add the apiReducer under the correct key
    [apiSlice.reducerPath]: apiReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiMiddleware),
  devTools: true,
});

setupListeners(store.dispatch);

export default store;
