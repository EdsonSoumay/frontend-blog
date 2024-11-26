// import { Route, Routes } from 'react-router-dom';
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import PostDetails from './pages/PostDetails';
// import CreatePost from './pages/CreatePost';
// import EditPost from './pages/EditPost';
// import Profile from './pages/Profile';
// import MyBlogs from './pages/MyBlogs';
// import Categories from './pages/Categories';
// import { useDispatch, useSelector } from 'react-redux';
// import { handleGetPosts } from './features/postDataSlice';
// import { useEffect } from 'react';
// import { handleRefetchUser } from './features/userDataSlice'; // Import aksi handleRefetchUser
// import { handleGetCategories } from './features/categoryDataSlice';
// import socket from './infrastructure/socket';
// import { setPosts } from './features/postDataSlice';
// import { SocketListenerGlobal } from './functions/SocketHelper';
// import { setCategories } from './features/categoryDataSlice';

// const App = () => {
//   const dispatch = useDispatch();
//   const search = useSelector((state) => state.sharedData.searchQuery); // Ambil data search dari Redux
//   const getPostsStatus = useSelector((state) => state.postData.getPostsStatus);
//   const refetchUserStatus = useSelector((state) => state.userData.refetchUserStatus);
//   const getCategoriesStatus =  useSelector((state) => state.categoryData.getCategoriesStatus);

//   const getPostsData = async (search) => {
//     dispatch(handleGetPosts(search));
//   }

//   useEffect(() => {
//     SocketListenerGlobal('all-posts',setPosts, dispatch);
//     SocketListenerGlobal('all-categories',setCategories, dispatch);
//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   useEffect(() => {
//     //dirender ulang ketika ada post baru atau ada post yang diupdate
//     if(getPostsStatus === 'idle'){
//       getPostsData('');
//     }
//   }, [dispatch, getPostsStatus]);

//   useEffect(() => {
//     //dirender ketika ada item  yang dicari
//      if(search){
//       getPostsData(search);
//     }
//   }, [search, dispatch]);

//   useEffect(() => {
//     dispatch(handleRefetchUser());
//     if(getCategoriesStatus === 'idle'){
//       dispatch(handleGetCategories());
//     }
//   }, [dispatch])



//   if(refetchUserStatus === 'loading'){
//     return <p>loading...</p>
//   }
  
//   return (
//       <Routes>
//         <Route exact path="/" element={<Home />} />
//         <Route exact path="/login" element={<Login />} />
//         <Route exact path="/register" element={<Register />} />
//         <Route exact path="/write" element={<CreatePost />} />
//         <Route exact path="/posts/post/:id" element={<PostDetails />} />
//         <Route exact path="/edit/:id" element={<EditPost />} />
//         <Route exact path="/myblogs/:id" element={<MyBlogs />} />
//         <Route exact path="/profile/:id" element={<Profile />} />
//         <Route exact path="/categories/" element={<Categories />} />
//       </Routes>
//   )
// }

// export default App;



import { Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PostDetails from './pages/PostDetails';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import Profile from './pages/Profile';
import MyBlogs from './pages/MyBlogs';
import Categories from './pages/Categories';
import { handleGetPosts } from './features/postDataSlice';
import { handleRefetchUser } from './features/userDataSlice';
import { handleGetCategories } from './features/categoryDataSlice';
import socket from './infrastructure/socket';
import { setPosts } from './features/postDataSlice';
import { SocketListenerGlobal } from './functions/SocketHelper';
import { setCategories } from './features/categoryDataSlice';

// ProtectedRoute Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.userData.user); // Cek apakah user login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.sharedData.searchQuery); // Ambil data search dari Redux
  const getPostsStatus = useSelector((state) => state.postData.getPostsStatus);
  const refetchUserStatus = useSelector((state) => state.userData.refetchUserStatus);
  const getCategoriesStatus = useSelector((state) => state.categoryData.getCategoriesStatus);

  const getPostsData = async (search) => {
    dispatch(handleGetPosts(search));
  };

  useEffect(() => {
    SocketListenerGlobal('all-posts', setPosts, dispatch);
    SocketListenerGlobal('all-categories', setCategories, dispatch);
    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  useEffect(() => {
    // Render ulang ketika ada post baru atau post yang diupdate
    if (getPostsStatus === 'idle') {
      getPostsData('');
    }
  }, [dispatch, getPostsStatus]);

  useEffect(() => {
    // Render ulang ketika ada item yang dicari
    if (search) {
      getPostsData(search);
    }
  }, [search, dispatch]);

  useEffect(() => {
    dispatch(handleRefetchUser());
    if (getCategoriesStatus === 'idle') {
      dispatch(handleGetCategories());
    }
  }, [dispatch, getCategoriesStatus]);

  if (refetchUserStatus === 'loading') {
    return <p>Loading...</p>;
  }

  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/write" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
      <Route exact path="/posts/post/:id" element={<ProtectedRoute><PostDetails /></ProtectedRoute>} />
      <Route exact path="/edit/:id" element={<ProtectedRoute><EditPost /></ProtectedRoute>} />
      <Route exact path="/myblogs/:id" element={<ProtectedRoute><MyBlogs /></ProtectedRoute>} />
      <Route exact path="/profile/:id" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route exact path="/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
    </Routes>
  );
};

export default App;
