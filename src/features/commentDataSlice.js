import { getComments, createComment, deleteComment } from "../request";
import {
  createSlice,
  createAsyncThunk, // untuk menghandle operasi asinkronus
} from "@reduxjs/toolkit";

import { createSelector } from "reselect";

// Thunk untuk operasi async
export const handleGetComments = createAsyncThunk("getComments", getComments);
export const handleCreateComment = createAsyncThunk("createComment", createComment);
export const handleDeleteComment = createAsyncThunk("deleteComment", deleteComment);

// Slice untuk commentData
const commentDataSlice = createSlice({
  name: "commentData",
  initialState: {
    commentsByPostId: {}, // Object of arrays { postId: [comments] }
    getCommentsStatus: {},
    getCommentsStatusMessage: {},
    createCommentStatusMessage: null,
    deleteCommentStatusMessage: null,
    createCommentStatus: 'idle',
    deleteCommentStatus: 'idle',
  },
  reducers: {
    resetCreateCommentStatus: (state) => {
      state.createCommentStatus = 'idle';
      state.createCommentStatusMessage = null;
    },
    resetDeleteCommentStatus: (state) => {
      state.deleteCommentStatus = 'idle';
      state.deleteCommentStatusMessage = null;
    },
    resetGetCommentsStatus: (state) => {
      state.getCommentsStatus = {};
      state.getCommentsStatusMessage = {};
    },
    setCommentsByPost: (state, action) => {
      state.commentsByPostId[action.payload[0].post_id] = action.payload; 
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle get comments
      .addCase(handleGetComments.pending, (state,action) => {
        state.getCommentsStatus[action.meta.arg] = 'loading'; //[action.meta.arg argument yang dikiri ke function get API
      })
      .addCase(handleGetComments.fulfilled, (state, action) => {
        state.commentsByPostId[action.meta.arg] = action.payload.data; 
        state.getCommentsStatus[action.meta.arg] = 'succeeded';
        state.getCommentsStatusMessage[action.meta.arg] = action.payload.message;
      })
      .addCase(handleGetComments.rejected, (state, action) => {
        state.getCommentsStatus[action.meta.arg] = 'failed';
        state.getCommentsStatusMessage[action.meta.arg] = action.error.message;
      })

      // Handle create comment
      .addCase(handleCreateComment.pending, (state) => {
        state.createCommentStatus = 'loading';
      })
      .addCase(handleCreateComment.fulfilled, (state, action) => {
        state.createCommentStatus = 'succeeded';
        state.createCommentStatusMessage = action.payload.message;
      })
      .addCase(handleCreateComment.rejected, (state, action) => {
        state.createCommentStatus = 'failed';
        state.createCommentStatusMessage = action.error.message;
      })

      // Handle delete comment
      .addCase(handleDeleteComment.pending, (state) => {
        state.deleteCommentStatus = 'loading';
      })
      .addCase(handleDeleteComment.fulfilled, (state, action) => {
        state.deleteCommentStatus = 'succeeded';
        state.deleteCommentStatusMessage = action.payload.message;
      })
      .addCase(handleDeleteComment.rejected, (state, action) => {
        state.deleteCommentStatus = 'failed';
        state.deleteCommentStatusMessage = action.error.message;
      });
  },
});


// Selector dasar untuk mengambil commentData dari state
const selectCommentData = (state) => state.commentData.commentsByPostId;

//menggunakan memoization dengan reselect, agar selector hanya mengembalikan array baru jika data benar-benar berubah
export const selectCommentsByPostId = createSelector(
  [selectCommentData, (state, postId) => postId],
  (commentsByPostId, postId) => commentsByPostId[postId] || []
);


// Actions untuk reset status dan error message
export const {
  resetCreateCommentStatus,
  resetDeleteCommentStatus,
  resetGetCommentsStatus,
  setCommentsByPost
} = commentDataSlice.actions;

export default commentDataSlice.reducer;
