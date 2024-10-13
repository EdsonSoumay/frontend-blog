import Footer from "../components/Footer"
import HomePosts from "../components/HomePosts"
import Navbar from "../components/Navbar"
import { Link } from "react-router-dom"
import Loader from '../components/Loader'
import { useSelector } from "react-redux";
import { postSelectors } from "../features/postDataSlice.js";
import { resetGetPostsStatus } from "../features/postDataSlice.js"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const Home = () => {
  const dispatch = useDispatch();
  const post = useSelector(postSelectors.selectAll);
  const user = useSelector((state) => state.userData.user); // Mengambil user dari Redux store
  const getPostsStatus = useSelector((state) => state.postData.getPostsStatus);
  const getPostsStatusMessage = useSelector((state) => state.postData.getPostsStatusMessage);

  useEffect(() => {
    if(getPostsStatus === 'loading'){
      dispatch(resetGetPostsStatus());
    }
  }, []);

  return (
    <>
     <Navbar/>
      <div className="px-8 md:px-[200px] min-h-[80vh]">
      {
        getPostsStatus === 'loading' ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : getPostsStatus === 'failed' && getPostsStatusMessage ? (
          <p className="text-center text-red-500">Error: {getPostsStatusMessage}</p>
        ) : (
          post.length > 0 ? (
            post.map((post) => (
              <div key={post.id}>
                <Link to={user ? `/posts/post/${post.id}` : "/login"}>
                  <HomePosts key={post.id} post={post} />
                </Link>
              </div>
            ))
          ) : (
            <h3 className="text-center font-bold mt-16">No posts available</h3>
          )
        )
      }
      </div>
    <Footer/>
    </>
  )
}

export default Home