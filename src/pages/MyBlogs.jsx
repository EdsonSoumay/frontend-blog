import { Link, useLocation } from "react-router-dom"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { useEffect, useState } from "react"
import HomePosts from "../components/HomePosts"
import Loader from "../components/Loader"
import { getPostsByUser } from "../request"
import { useSelector } from "react-redux"; // Import Redux hooks

const MyBlogs = () => {
    const {search}=useLocation()
  // console.log(search)
  const [posts,setPosts]=useState([])
  const [noResults,setNoResults]=useState(false)
  const [loader,setLoader]=useState(false)
  const user = useSelector((state) => state.userData.user); // Mengambil user dari Redux store

  const fetchPosts=async()=>{
    setLoader(true)
    try{
      const res = await getPostsByUser(user?.id)
      setPosts(res)
      if(res.length===0){
        setNoResults(true)
      }
      else{
        setNoResults(false)
      }
      setLoader(false)
      
    }
    catch(err){
      console.log(err)
      setLoader(true)
    }
  }

  useEffect(()=>{
    fetchPosts()

  },[search, user])

  return (
    <div>
        <Navbar/>
        <div className="px-8 md:px-[200px] min-h-[80vh]">
        {loader?<div className="h-[40vh] flex justify-center items-center"><Loader/></div>:!noResults?
        posts.map((post)=>(
          <div key = {post.id}>
          <Link to={user?`/posts/post/${post.id}`:"/login"}>
          <HomePosts key={post.id} post={post}/>
          </Link>
          </div>
          
        )):<h3 className="text-center font-bold mt-16">No posts available</h3>}
        </div>
        <Footer/>
    </div>
  )
}

export default MyBlogs