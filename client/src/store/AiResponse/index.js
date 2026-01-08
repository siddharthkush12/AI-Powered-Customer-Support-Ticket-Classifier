import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  ticket: null,      // Last analyzed ticket
  history: [],       // 👈 Add this to store the list of 10 tickets
  isLoading: false,
  error: null,
};

// Existing Analyze Thunk
export const analyzeTicket = createAsyncThunk(
  "ai/analyzeTicket",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND}/api/tickets/analyze`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "AI analysis failed");
    }
  }
);

// 🆕 New Thunk to fetch stored tickets
export const fetchTicketHistory = createAsyncThunk(
  "ai/fetchHistory",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND}/api/tickets`);
      console.log(res.data.data);
      
      return res.data.data; // The array of tickets from your JSON file
    } catch (err) {
      return rejectWithValue("Failed to load history");
    }
  }
);

const aiSlice = createSlice({
  name: "ai",
  initialState,
  reducers: {
    clearAIState: (state) => {
      state.ticket = null;
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      /* Analyze Cases */
      .addCase(analyzeTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(analyzeTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ticket = action.payload;
        // Optionally add the new ticket to the top of history locally
        state.history = [action.payload, ...state.history].slice(0, 10);
      })
      /* 🆕 Fetch History Cases */
      .addCase(fetchTicketHistory.fulfilled, (state, action) => {
        state.history = action.payload;
      });
  },
});

export const { clearAIState } = aiSlice.actions;
export default aiSlice.reducer;