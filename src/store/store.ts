import { configureStore } from "@reduxjs/toolkit";
import musiciansReducer from "./musiciansSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    musicians: musiciansReducer,
    auth: authReducer,
  },
});

// THESE ARE BASED AF HERE
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
