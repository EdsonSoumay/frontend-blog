// ini adalah logika redux
import { getCategories, createCategory, deleteCategory } from "../request";
import {
  createSlice,
  createAsyncThunk, // untuk menghandle opearasi asinkronus
  createEntityAdapter,
} from "@reduxjs/toolkit";

export const handleGetCategories = createAsyncThunk("getCategories", getCategories);
export const handleCreateCategory = createAsyncThunk("createCategory", createCategory);
export const handleDeleteCategory = createAsyncThunk("deleteCategory", deleteCategory);

const categoryEntity = createEntityAdapter({
  selectId: (category) => category.id,
});

const categoryDataSlice = createSlice({
  name: "categoryData",
  initialState: {
    ...categoryEntity.getInitialState(),
    getCategoriesStatus: 'idle',
    createCategoryStatus: 'idle',
    deleteCategoryStatus: 'idle',
    getCategoriesStatusMessage: null,
    createCategoryStatusMessage: null,
    deleteCategoryStatusMessage: null,
  },
  reducers: {
    resetCreateCategoryStatus: (state) => {
      state.createCategoryStatus = 'idle';
      state.createCategoryStatusMessage = null;
    },
    resetGetCategoriesStatus: (state) => {
      state.getCategoriesStatus = 'idle';
      state.getCategoriesStatusMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder // untuk menangani aksi asyncrhonus
      //aksi get categories
      .addCase(handleGetCategories.pending, (state, action) => {
        state.getCategoriesStatus = 'loading';
      })
      .addCase(handleGetCategories.fulfilled, (state, action) => {
        categoryEntity.setAll(state, action.payload.data);
        state.getCategoriesStatus = 'succeeded';
        state.getCategoriesStatusMessage = action.payload.message;
      })
      .addCase(handleGetCategories.rejected, (state, action) => {
        state.getCategoriesStatus = 'failed';
        state.getCategoriesStatusMessage = action.error.message;
      })

      //aksi create category
      .addCase(handleCreateCategory.pending, (state) => {
        state.createCategoryStatus = 'loading';
      })
      .addCase(handleCreateCategory.fulfilled, (state, action) => {
        state.createCategoryStatus = 'succeeded';
        state.getCategoriesStatus = 'idle';
        state.createCategoryStatusMessage = action.payload.message;
      })
      .addCase(handleCreateCategory.rejected, (state, action) => {
        state.createCategoryStatus = 'failed';
        state.createCategoryStatusMessage = action.error.message;
      })
    
      //aksi delete category
      .addCase(handleDeleteCategory.pending, (state) => {
        state.deleteCategoryStatus = 'loading';
      })
      .addCase(handleDeleteCategory.fulfilled, (state, action) => {
        state.deleteCategoryStatus = 'succeeded';
        state.getCategoriesStatus = 'idle';
        state.deleteCategoryStatusMessage = action.payload.message;
      })
      .addCase(handleDeleteCategory.rejected, (state, action) => {
        state.deleteCategoryStatus = 'failed';
        state.deleteCategoryStatusMessage = action.error.message;
      })
  },
});

export const categorySelectors = categoryEntity.getSelectors(
  (state) => {
    return state.categoryData
  }
);

export const { resetCreateCategoryStatus,  resetGetCategoriesStatus } = categoryDataSlice.actions;

export default categoryDataSlice.reducer;