import { configureStore } from "@reduxjs/toolkit";
import musiciansReducer from "./musiciansSlice";

export const store = configureStore({
  reducer: {
    musicians: musiciansReducer,
  },
});
