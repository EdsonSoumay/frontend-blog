// ini adalah logika redux
import { getPosts, createPost, editPost, deletePost, uploadFile, getPost } from "../request";
import {
  createSlice,
  createAsyncThunk, // untuk menghandle opearasi asinkronus
  createEntityAdapter,
} from "@reduxjs/toolkit";

export const handleGetPost = createAsyncThunk("getPost", getPost);
export const handleGetPosts = createAsyncThunk("getPosts", getPosts);
export const handleCreatePost = createAsyncThunk("createPost", createPost);
export const handleEditPost = createAsyncThunk("editPost", editPost);
export const handleDeletePost = createAsyncThunk("deletePost", deletePost);
export const handleUploadFile = createAsyncThunk('uploadFile', uploadFile)

const postEntity = createEntityAdapter({
  selectId: (post) => post.id,
});

const postSlice = createSlice({
  name: "postData",
  initialState: {
    ...postEntity.getInitialState(),
    getPostsStatus: 'idle',
    createPostStatus: 'idle',
    deletePostStatus: 'idle',
    editPostStatus: 'idle',
    getPostsErrorMessage: null,
    createPostErrorMessage: null,
    deletePostErrorMessage: null,
    editPostErrorMessage: null,
    getPostsDetail:{}
  },
  reducers: {
    resetCreatePostStatus: (state) => {
      state.createPostStatus = 'idle';
      state.createPostErrorMessage = null;
    },
    resetEditPostStatus: (state) => {
      state.editPostStatus = 'idle';
      state.editPostErrorMessage = null;
    },
    resetDeletePostStatus: (state) => {
      state.deletePostStatus = 'idle';
      state.deletePostErrorMessage = null;
    },
    resetGetPostsStatus: (state) => {
      state.getPostsStatus = 'idle';
      state.getPostsErrorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder // untuk menangani aksi asyncrhonus
    
      //aksi get post
      .addCase(handleGetPost.pending, (state, action) => {
        state.getPostsStatus = 'loading';
      })
      .addCase(handleGetPost.fulfilled, (state, action) => {
        // console.log("action payload:",action.payload)
        state.getPostsDetail[action.payload.id] = action.payload;
      })
      .addCase(handleGetPost.rejected, (state, action) => {
        state.getPostsStatus = 'failed';
        state.getPostsErrorMessage = action.error.message;
      })

          

      //aksi get posts
      .addCase(handleGetPosts.pending, (state, action) => {
        state.getPostsStatus = 'loading';
      })
      .addCase(handleGetPosts.fulfilled, (state, action) => {
        postEntity.setAll(state, action.payload);
        state.getPostsStatus = 'succeeded';
      })
      .addCase(handleGetPosts.rejected, (state, action) => {
        state.getPostsStatus = 'failed';
        state.getPostsErrorMessage = action.error.message;
      })

      //aksi create post
      .addCase(handleCreatePost.pending, (state) => {
        state.createPostStatus = 'loading';
      })
      .addCase(handleCreatePost.fulfilled, (state, action) => {
        state.createPostStatus = 'succeeded';
        state.getPostsStatus = 'idle';
        // postEntity.addOne(state, action.payload); // Menambahkan produk yang baru disimpan secara langsung tanpa perlu get API
      })
      .addCase(handleCreatePost.rejected, (state, action) => {
        state.createPostStatus = 'failed';
        state.createPostErrorMessage = action.error.message;
      })

       // Aksi `update post`
       .addCase(handleEditPost.pending, (state) => {
        state.editPostStatus = 'loading';
      })
      .addCase(handleEditPost.fulfilled, (state, action) => {
        state.editPostStatus = 'succeeded';
        state.getPostsStatus = 'idle';
      })
      .addCase(handleEditPost.rejected, (state, action) => {
        state.editPostStatus = 'failed';
        state.editPostErrorMessage = action.error.message;
      })

      //aksi delete post
      .addCase(handleDeletePost.pending, (state) => {
        state.deletePostStatus = 'loading';
      })
      .addCase(handleDeletePost.fulfilled, (state, action) => {
        state.deletePostStatus = 'succeeded';
        state.getPostsStatus = 'idle';
        // postEntity.removeOne(state, action.payload); // Menghapus produk berdasarkan ID secara langsung tanpa perlu get API
      })
      .addCase(handleDeletePost.rejected, (state, action) => {
        state.deletePostStatus = 'failed';
        state.deletePostErrorMessage = action.error.message;
      })
  },
});

export const postSelectors = postEntity.getSelectors(
  (state) => {
    console.log("state.postData:",state.postData)
    return state.postData
  }
);

export const { resetCreatePostStatus, resetEditPostStatus, resetDeletePostStatus, resetGetPostsStatus } = postSlice.actions;

export default postSlice.reducer;
