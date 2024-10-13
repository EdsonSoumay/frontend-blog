// userDataSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { refetch, register, login, logout, getProfileUser, updateProfileUser} from "../request";

// Aksi asinkron untuk mengambil data pengguna
export const handleRefetchUser = createAsyncThunk("refetch", refetch);
export const handleRegister = createAsyncThunk("register", register);
export const handleLogin = createAsyncThunk("login", login);
export const handleLogout = createAsyncThunk("logout", logout);

export const handleGetProfileUser = createAsyncThunk("getProfileUser", getProfileUser);
export const handleUpdateProfileUser = createAsyncThunk("updateProfileUser", updateProfileUser);

// Slice untuk data pengguna
const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    user: null,
    refetchUserStatus: "idle",
    registerStatus: 'idle',
    loginStatus: 'idle',
    logoutStatus: 'idle',
    updateProfileUser: 'idle',

    refetchUserStatusMessage: null,
    registerStatusMessage: null,
    loginStatusMessage: null,
    logoutStatusMessage: null,
    updateProfileUserStatusMessage: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.user = action.payload.data; // Menyimpan pengguna ke dalam state
    },
    clearUserData: (state) => {
        state.user = null; // Hapus data user dari state
    },
    resetRegisterStatus: (state) => {
      state.registerStatus = 'idle';
      state.registerStatusMessage = null;
    },
    resetLoginStatus: (state) => {
      state.loginStatus = 'idle';
      state.loginStatusMessage = null;
    },
    resetLogoutStatus: (state) => {
      state.logoutStatus = 'idle';
      state.logoutStatusMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder

      //Register
      .addCase(handleRegister.pending, (state) => {
        state.registerStatus = "loading";
      })
      .addCase(handleRegister.fulfilled, (state, action) => {
        state.registerStatus = "succeeded";
        state.registerStatusMessage = action.payload.message;
      })
      .addCase(handleRegister.rejected, (state, action) => {
        state.registerStatus = "failed";
        state.registerStatusMessage = action.error.message;
      })

      //Login
      .addCase(handleLogin.pending, (state) => {
        state.loginStatus = "loading";
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.loginStatus = "succeeded";
        state.loginStatusMessage = action.payload.message;
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.loginStatusMessage = action.error.message;
      })

      //refetch
      .addCase(handleRefetchUser.pending, (state) => {
        state.refetchUserStatus = "loading";
      })
      .addCase(handleRefetchUser.fulfilled, (state, action) => {
        state.refetchUserStatus = "succeeded";
        state.user = action.payload.data;
      })
      .addCase(handleRefetchUser.rejected, (state, action) => {
        state.refetchUserStatus = "failed";
        state.refetchUserStatusMessage = action.error.message;
      })


       //Logout
      .addCase(handleLogout.pending, (state) => {
        state.logoutStatus = "loading";
      })
      .addCase(handleLogout.fulfilled, (state, action) => {
        state.logoutStatus = "succeeded";
      })
      .addCase(handleLogout.rejected, (state, action) => {
        state.logoutStatus = "failed";
        state.logoutStatusMessage = action.error.message;
      })

      //update user
      .addCase(handleUpdateProfileUser.pending, (state) => {
        state.updateProfileUser = "loading";
      })
      .addCase(handleUpdateProfileUser.fulfilled, (state, action) => {
        state.updateProfileUser = "succeeded";
      })
      .addCase(handleUpdateProfileUser.rejected, (state, action) => {
        state.updateProfileUser = "failed";
        state.updateProfileUserStatusMessage = action.error.message;
      })
  },
});

// Ekspor aksi
export const { setUserData, clearUserData, resetRegisterStatus, resetLoginStatus, resetLogoutStatus } = userDataSlice.actions;

// Ekspor reducer
export default userDataSlice.reducer;
