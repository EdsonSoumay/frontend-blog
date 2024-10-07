// ini state global yang dapat diakses disemua component dalam aplikasi
import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../features/postSlice";
import sharedData from '../features/sharedDataSlice'
import userData from '../features/userDataSlice'

export const store = configureStore({
  reducer: {
    postData: postReducer,
    sharedData: sharedData,
    userData: userData,
  },
});


// // store.js
// import { configureStore } from "@reduxjs/toolkit";
// import postReducer from "../features/postSlice";
// import sharedData from "../features/sharedDataSlice";
// import userData from "../features/userDataSlice";
// import storage from "redux-persist/lib/storage"; // defaultnya menggunakan local storage
// import { persistReducer, persistStore } from "redux-persist";
// import { combineReducers } from "redux";

// // Konfigurasi redux-persist
// const persistConfig = {
//   key: "root", // Root key untuk persist
//   storage, // Menggunakan local storage
//   whitelist: ["sharedData", "userData"], // Slice yang ingin disimpan
// };

// // Gabungkan reducers
// const rootReducer = combineReducers({
//   postData: postReducer,
//   sharedData: sharedData,
//   userData: userData,
// });

// // Menggunakan persistReducer untuk rootReducer
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // Konfigurasi store dengan persistedReducer
// export const store = configureStore({
//   reducer: persistedReducer, // Gunakan reducer yang sudah dipersist
//   // Middleware otomatis dari @reduxjs/toolkit sudah termasuk thunk
// });

// // Membuat persistor untuk menyimpan dan memulihkan state
// export const persistor = persistStore(store);
