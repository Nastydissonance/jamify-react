import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import musiciansReducer from "./musiciansSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    musicians: musiciansReducer,
    auth: authReducer,
  },
});

// ============================================================
// TYPES FOR HOOKS (IMPORTANT AF)
// ============================================================

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// TYPIFIED HOOKS
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
