import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: "", // Menyimpan kata kunci pencarian
};

const searchSlice = createSlice({
  name: "sharedData",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload; // Mengubah nilai pencarian
    }
  },
});

// Export actions untuk digunakan di komponen
export const { setSearchQuery } = searchSlice.actions;

// Export reducer untuk diintegrasikan di store
export default searchSlice.reducer;
