import { Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostDetails from './pages/PostDetails';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import Profile from './pages/Profile';
import MyBlogs from './pages/MyBlogs';
import Categories from './pages/Categories';
import { useDispatch, useSelector } from 'react-redux';
import { handleGetPosts } from './features/postDataSlice';
import { useEffect } from 'react';
import { handleRefetchUser } from './features/userDataSlice'; // Import aksi handleRefetchUser
import { handleGetCategories } from './features/categoryDataSlice';

const App = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.sharedData.searchQuery); // Ambil data search dari Redux
  const getPostsStatus = useSelector((state) => state.postData.getPostsStatus);
  const refetchUserStatus = useSelector((state) => state.userData.refetchUserStatus);
  const getCategoriesStatus =  useSelector((state) => state.categoryData.getCategoriesStatus);

  const getPostsData = async (search) => {
    dispatch(handleGetPosts(search));
  }

  useEffect(() => {
    //dirender ulang ketika ada post baru atau ada post yang diupdate
    if(getPostsStatus === 'idle'){
      getPostsData('');
    }
  }, [dispatch, getPostsStatus]);

  useEffect(() => {
    //dirender ketika ada item  yang dicari
     if(search){
      getPostsData(search);
    }
  }, [search, dispatch]);

  useEffect(() => {
    dispatch(handleRefetchUser());
  }, [dispatch])
  

  useEffect(() => {
    if(getCategoriesStatus === 'idle'){
      dispatch(handleGetCategories());
    }
  }, [dispatch]);

  if(refetchUserStatus === 'loading'){
    return <p>loading...</p>
  }
  
  return (
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/write" element={<CreatePost />} />
        <Route exact path="/posts/post/:id" element={<PostDetails />} />
        <Route exact path="/edit/:id" element={<EditPost />} />
        <Route exact path="/myblogs/:id" element={<MyBlogs />} />
        <Route exact path="/profile/:id" element={<Profile />} />
        <Route exact path="/categories/" element={<Categories />} />
      </Routes>
  )
}

export default App;
