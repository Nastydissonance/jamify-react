import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../utils/api";
import { Musician, MusiciansState } from "../types";

// ============================================================
// INITIAL STATE
// ============================================================

const initialState: MusiciansState = {
  items: [],
  status: "idle",
  error: null,
  selectedFilters: [],
};

// ============================================================
// ASYNC ACTION (THUNK)
// ============================================================

export const fetchMusicians = createAsyncThunk<
  Musician[], // what I return (data type)
  void, // arg (I pass nothing)
  { rejectValue: string } // error type
>("musicians/fetchMusicians", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/musicians");
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

// ============================================================
// SLICE
// ============================================================

const musiciansSlice = createSlice({
  name: "musicians",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    toggleFilter: (state, action: PayloadAction<string>) => {
      const filter = action.payload;
      if (state.selectedFilters.includes(filter)) {
        state.selectedFilters = state.selectedFilters.filter(
          (f) => f !== filter,
        );
      } else {
        state.selectedFilters.push(filter);
      }
    },
    clearFilters: (state) => {
      state.selectedFilters = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMusicians.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        fetchMusicians.fulfilled,
        (state, action: PayloadAction<Musician[]>) => {
          state.status = "succeeded";
          state.items = action.payload;
        },
      )
      .addCase(fetchMusicians.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch musicians";
      });
  },
});

export const { clearError, toggleFilter, clearFilters } =
  musiciansSlice.actions;
export default musiciansSlice.reducer;
