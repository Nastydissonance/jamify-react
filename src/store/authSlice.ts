import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../utils/api";
import { AuthState } from "../types";

// ============================================================
// INITIAL STATE
// ============================================================

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// ============================================================
// THUNKS
// ============================================================

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }: { username: string; password: string }) => {
    // For json-server: lloking for a user with username and password
    const response = await api.get("/users", {
      params: { username, password },
    });

    if (!response.data.length) {
      throw new Error("Invalid credentials");
    }

    return { username };
  },
);

export const logout = createAsyncThunk("auth/logout", async () => {
  // Just quit
  return null;
});

// ============================================================
// SLICE
// ============================================================

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<{ username: string }>) => {
          state.loading = false;
          state.isAuthenticated = true;
          state.user = action.payload;
          state.error = null;
        },
      )
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.error.message || "Login failed";
      })
      // LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
