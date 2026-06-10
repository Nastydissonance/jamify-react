import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

// Асинхронный thunk для загрузки музыкантов
export const fetchMusicians = createAsyncThunk(
  "musicians/fetchMusicians",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/musicians");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const initialState = {
  items: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const musiciansSlice = createSlice({
  name: "musicians",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMusicians.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchMusicians.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchMusicians.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch musicians";
      });
  },
});

export const { clearError } = musiciansSlice.actions;
export default musiciansSlice.reducer;
