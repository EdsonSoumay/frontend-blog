import { Link } from "react-router-dom"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { useEffect } from "react"
import HomePosts from "../components/HomePosts"
import Loader from "../components/Loader"
import { useSelector, useDispatch } from "react-redux"; // Import Redux hooks
import { handleGetPostsByUser } from "../features/postDataSlice"

const MyBlogs = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.userData.user); // Mengambil user dari Redux store
  const posts = useSelector((state) => state.postData.getPostByUser);

  const getPostsByUserStatus = useSelector((state) => state.postData.getPostsByUserStatus);
  const getPostsByUseErrorMessage = useSelector((state) => state.postData.getPostsByUseErrorMessage);

  useEffect(()=>{
    if(getPostsByUserStatus === 'idle' && user){
      dispatch(handleGetPostsByUser(user?.id));
    }
  },[user,getPostsByUserStatus])

  return (
    <div>
        <Navbar/>
        <div className="px-8 md:px-[200px] min-h-[80vh]">
          {
          getPostsByUserStatus === 'loading' ?<div className="h-[40vh] flex justify-center items-center"><Loader/></div>
            :
            getPostsByUserStatus === 'failed' ?
            <h3 className="text-center font-bold mt-16">{getPostsByUseErrorMessage}</h3>:
            posts.map((post)=>(
              <div key = {post.id}>
              <Link to={user?`/posts/post/${post.id}`:"/login"}>
                <HomePosts key={post.id} post={post}/>
              </Link>
              </div>
            ))
          }
        </div>
        <Footer/>
    </div>
  )
}

export default MyBlogs