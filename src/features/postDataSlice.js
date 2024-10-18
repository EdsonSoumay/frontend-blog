// ini adalah logika redux
import { getPosts, createPost, editPost, deletePost, uploadFile, getPost, getPostsByUser } from "../request";
import {
  createSlice,
  createAsyncThunk, // untuk menghandle opearasi asinkronus
  createEntityAdapter,
} from "@reduxjs/toolkit";

export const handleGetPost = createAsyncThunk("getPost", getPost);
export const handleGetPosts = createAsyncThunk("getPosts", getPosts);
export const handleGetPostsByUser = createAsyncThunk("getPostsByUser", getPostsByUser);
export const handleCreatePost = createAsyncThunk("createPost", createPost);
export const handleEditPost = createAsyncThunk("editPost", editPost);
export const handleDeletePost = createAsyncThunk("deletePost", deletePost);
export const handleUploadFile = createAsyncThunk('uploadFile', uploadFile)

const postEntity = createEntityAdapter({
  selectId: (post) => post.id,
});

const postDataSlice = createSlice({
  name: "postData",
  initialState: {
    ...postEntity.getInitialState(),
    getPostByUser: [],
    getPostsStatus: 'idle',
    getPostsByUserStatus: 'idle',
    createPostStatus: 'idle',
    postImageStatus: 'idle',
    deletePostStatus: 'idle',
    editPostStatus: 'idle',
    getPostsByUserStatusMessage: null,
    getPostsStatusMessage: null,
    createPostStatusMessage: null,
    postImageStatusMessage: null,
    deletePostStatusMessage: null,
    editPostStatusMessage: null,
    getPostsDetail:{}, // untuk get post secara satu per satu
    getPostsDetailStatus:{}, // untuk get post secara satu per satu
    getPostsDetailStatusMessage:{} // untuk get post secara satu per satu
  },
  reducers: {
    resetCreatePostStatus: (state) => {
      state.createPostStatus = 'idle';
      state.createPostStatusMessage = null;
    },
    resetPostImageStatus: (state) => {
      state.postImageStatus = 'idle';
      state.postImageStatusMessage = null;
    },
    resetEditPostStatus: (state) => {
      state.editPostStatus = 'idle';
      state.editPostStatusMessage = null;
    },
    resetDeletePostStatus: (state) => {
      state.deletePostStatus = 'idle';
      state.deletePostStatusMessage = null;
    },
    resetGetPostsStatus: (state) => {
      state.getPostsStatus = 'idle';
      state.getPostsStatusMessage = null;
    },
    setPosts: (state, action) => {
      postEntity.setAll(state, action.payload);
    },
    setPostsByUser: (state, action) => {
      state.getPostByUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder // untuk menangani aksi asyncrhonus

      //aksi get posts
      .addCase(handleGetPosts.pending, (state, action) => {
        state.getPostsStatus = 'loading';
      })
      .addCase(handleGetPosts.fulfilled, (state, action) => {
        postEntity.setAll(state, action.payload.data);
        state.getPostsStatusMessage = action.payload.message;
        state.getPostsStatus = 'succeeded';
      })
      .addCase(handleGetPosts.rejected, (state, action) => {
        state.getPostsStatus = 'failed';
        state.getPostsStatusMessage = action.error.message;
      })

      //aksi get post
      .addCase(handleGetPost.pending, (state, action) => {
        state.getPostsDetailStatus[action.meta.arg] = 'loading'; // tidak bisa karena ketika loading data payload blum ada
      })
      .addCase(handleGetPost.fulfilled, (state, action) => {
        state.getPostsDetailStatus[action.meta.arg] = 'succeeded';
        state.getPostsDetail[action.meta.arg] = action.payload.data;
        state.getPostsDetailStatusMessage[action.meta.arg] = action.payload.message;
      })
      .addCase(handleGetPost.rejected, (state, action) => {
        state.getPostsDetailStatus[action.meta.arg] = 'failed';
        state.getPostsDetailStatusMessage[action.meta.arg] = action.error.message;
      })
    
      //aksi get posts by user
      .addCase(handleGetPostsByUser.pending, (state, action) => {
        state.getPostsByUserStatus = 'loading';
      })
      .addCase(handleGetPostsByUser.fulfilled, (state, action) => {
        state.getPostsByUserStatus = 'succeeded';
        state.getPostByUser = action.payload.data;
        state.getPostsByUserStatusMessage = action.payload.message;
      })
      .addCase(handleGetPostsByUser.rejected, (state, action) => {
        state.getPostsByUserStatus = 'failed';
        state.getPostsByUserStatusMessage = action.error.message;
      })

      //aksi create post
      .addCase(handleCreatePost.pending, (state) => {
        state.createPostStatus = 'loading';
      })
      .addCase(handleCreatePost.fulfilled, (state, action) => {
        state.createPostStatus = 'succeeded';
        state.getPostsStatus = 'idle';
        state.createPostStatusMessage = action.payload.message;
        // postEntity.addOne(state, action.payload); // Menambahkan produk yang baru disimpan secara langsung tanpa perlu get API
      })
      .addCase(handleCreatePost.rejected, (state, action) => {
        state.createPostStatus = 'failed';
        state.createPostStatusMessage = action.error.message;
      })

       // Aksi `update post`
       .addCase(handleEditPost.pending, (state) => {
        state.editPostStatus = 'loading';
      })
      .addCase(handleEditPost.fulfilled, (state, action) => {
        state.editPostStatus = 'succeeded';
        state.getPostsStatus = 'idle';
        state.editPostStatusMessage = action.payload.message;
      })
      .addCase(handleEditPost.rejected, (state, action) => {
        state.editPostStatus = 'failed';
        state.editPostStatusMessage = action.error.message;
      })

      //aksi delete post
      .addCase(handleDeletePost.pending, (state) => {
        state.deletePostStatus = 'loading';
      })
      .addCase(handleDeletePost.fulfilled, (state, action) => {
        state.deletePostStatus = 'succeeded';
        state.getPostsStatus = 'idle';
        state.deletePostStatusMessage = action.payload.message;
        // postEntity.removeOne(state, action.payload); // Menghapus produk berdasarkan ID secara langsung tanpa perlu get API
      })
      .addCase(handleDeletePost.rejected, (state, action) => {
        state.deletePostStatus = 'failed';
        state.deletePostStatusMessage = action.error.message;
      })

      // Aksi `upload file`
      .addCase(handleUploadFile.pending, (state) => {
        state.postImageStatus = 'loading';
      })
      .addCase(handleUploadFile.fulfilled, (state, action) => {
        state.postImageStatus = 'succeeded';
        state.postImageStatusMessage = action.payload.message;
      })
      .addCase(handleUploadFile.rejected, (state, action) => {
        state.postImageStatus = 'failed';
        state.postImageStatusMessage = action.error.message;
      })
  },
});

export const postSelectors = postEntity.getSelectors(
  (state) => {
    return state.postData
  }
);

export const { resetCreatePostStatus, resetEditPostStatus, resetDeletePostStatus, resetGetPostsStatus, resetPostImageStatus, setPosts, setPostsByUser } = postDataSlice.actions;

export default postDataSlice.reducer;
