import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./userSlice/authSlice";
import { apiSlice } from "./userSlice/apiSlice";
import { BlogApiSlice } from "./blogSlice/BlogApiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer, 
    [apiSlice.reducerPath]: apiSlice.reducer, 
    [BlogApiSlice.reducerPath]: BlogApiSlice.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware) .concat(BlogApiSlice.middleware), 
  devTools: true, 
});
