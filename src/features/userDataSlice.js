// userDataSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { refetch } from "../request";

// Aksi asinkron untuk mengambil data pengguna
export const fetchUserData = createAsyncThunk("refetch", async () => {
  const response = await refetch();
  return response; // Mengembalikan data pengguna
});

// Slice untuk data pengguna
const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    user: null,
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload; // Menyimpan pengguna ke dalam state
    },
    clearUserData: (state) => {
        state.user = null; // Hapus data user dari state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload; // Menyimpan pengguna
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; // Menyimpan error jika ada
      });
  },
});

// Ekspor aksi
export const { setUserData, clearUserData } = userDataSlice.actions;

// Ekspor reducer
export default userDataSlice.reducer;
