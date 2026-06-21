import { configureStore } from "@reduxjs/toolkit";
import musiciansReducer from "./musiciansSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    musicians: musiciansReducer,
    auth: authReducer,
  },
});
