// ini state global yang dapat diakses disemua component dalam aplikasi
import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/postDataSlice";
import sharedData from '../features/sharedDataSlice';
import userData from '../features/userDataSlice';
import commentData from '../features/commentDataSlice'
import categoryData from '../features/categoryDataSlice'

export const store = configureStore({
  reducer: {
    postData: postReducer,
    sharedData: sharedData,
    userData: userData,
    commentData: commentData,
    categoryData: categoryData,
  },
});