
import { useNavigate, useParams } from "react-router-dom"
import Comment from "../components/Comment"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import {BiEdit} from 'react-icons/bi'
import {MdDelete} from 'react-icons/md'
import { IF } from "../url"
import { useEffect, useState } from "react"
import Loader from "../components/Loader"
import { getComments, createComment } from "../request"
import { useDispatch, useSelector } from "react-redux";
import { handleDeletePost, handleGetPost, resetDeletePostStatus } from "../features/postSlice"
import { Link } from 'react-router-dom';

const PostDetails = () => {
  const dispatch = useDispatch();
  const post_id=useParams().id
  const user = useSelector((state) => state.userData.user); // Mengambil user dari Redux store
  const post = useSelector((state) => state.postData.getPostsDetail[post_id]);
  
  const [comments,setComments]=useState([])
  const [comment,setComment]=useState("")
  const [loader,setLoader]=useState(false)
  const navigate=useNavigate()

  const deletePostStatus = useSelector((state) => state.postData.deletePostStatus);
  const deletePostErrorMessage = useSelector((state) => state.postData.deletePostErrorMessage);

  const isDeleting = deletePostStatus === 'loading';  // Status loading ketika menghapus
  const isDeleted = deletePostStatus === 'succeeded'; // Status berhasil menghapus
  const isError = deletePostErrorMessage;  // Pesan error jika ada error

  const deletePost=async ()=>{
    try {
      const resultAction =  await dispatch(handleDeletePost(post_id));
       if (handleDeletePost.fulfilled.match(resultAction)){
         // console.log("Produk berhasil disimpan:", resultAction.payload);
           setTimeout(() => {
             navigate("/"); // Kembali ke halaman utama jika sukses
             dispatch(resetDeletePostStatus());
           }, 2000);
       }
       // Jika ada error (rejected), tampilkan error dari resultAction
       else if (handleDeletePost.rejected.match(resultAction)){
         // console.log("Error saat menyimpan produk:", resultAction.error.message);
         setTimeout(() => {
           dispatch(resetDeletePostStatus());
         }, 2000);
       }
     } catch (err) {
       console.log(err);
     }
  }

  const postComment=async(e)=>{
    e.preventDefault()
    try{
      const res = await createComment({comment:comment,post_id:post_id,user_id:user.id})
      window.location.reload(true)
    }
    catch(err){
         console.log(err)
    }
  }
  const fetchPostComments=async()=>{
    setLoader(true)
    try{
      const res = await getComments(post_id)
      setComments(res)
      setLoader(false)

    }
    catch(err){
      setLoader(true)
      console.log(err)
    }
  }

  useEffect(()=>{
    if(!post){
      dispatch(handleGetPost(post_id));
    }
  },[post_id, post])

  useEffect(()=>{
    fetchPostComments()
  },[post_id])

  return (
    <div>
        <Navbar/>
        {loader?<div className="h-[80vh] flex justify-center items-center w-full"><Loader/></div>:<div className="px-8 md:px-[200px] mt-8">
        <div className="flex justify-between items-center">
         <h1 className="text-2xl font-bold text-black md:text-3xl">{post?.title}</h1>
         {user?.id===post?.user_id && 
         <div className="flex items-center justify-center space-x-2">
            {/* <p className="cursor-pointer" onClick={() => navigate("/edit/" + post_id, { state: post })}
             ><BiEdit/></p> */}
          <Link to={`/edit/${post_id}`} state={post} className="cursor-pointer">
              <BiEdit/>
          </Link>

             <button 
              className={`cursor-pointer ${isDeleting || isDeleted ? 'cursor-not-allowed' : ''}`}
              onClick={!isDeleting && !isDeleted ? deletePost : null}  // Hanya bisa diklik saat tidak menghapus
              disabled={isDeleting || isDeleted}  // Menonaktifkan tombol saat dalam proses penghapusan atau berhasil
            >
              <MdDelete className={`${isDeleting || isDeleted ? 'text-gray-400' : 'text-black'}`} /> {/* Ubah warna saat penghapusan berlangsung */}
            </button>


      {/* Pesan jika ada error */}
      {isError && <p className="text-red-500">{isError}</p>}
         </div>
         }
        </div>
        <div className="flex items-center justify-between mt-2 md:mt-4">
        <p>@{post?.user?.username}</p>
       <div className="flex space-x-2">
       <p>{new Date(post?.updatedAt).toString().slice(0,15)}</p>
       <p>{new Date(post?.updatedAt).toString().slice(16,24)}</p>
       </div>
        </div>
        <img src={IF+post?.photo} className="w-full  mx-auto mt-8" alt=""/>
         <p className="mx-auto mt-8">{post?.desc}</p>
         <div className="flex items-center mt-8 space-x-4 font-semibold">
          <p>Categories:</p>
          <div className="flex justify-center items-center space-x-2">   
            <span className="bg-gray-300 rounded-lg px-3 py-1">{post?.category?.category_description}</span>
          </div>
         </div>
         <div className="flex flex-col mt-4">
         <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
         {comments?.map((c)=>(
          <Comment key={c.id} c={c} post={post} />
         ))}
           
         </div>
         {/* write a comment */}
         <div className="w-full flex flex-col mt-4 md:flex-row">
          <input
            onChange={(e) => setComment(e.target.value)}
            type="text"
            placeholder="Write a comment"
            className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0 border border-gray-300 rounded-md"
          />
          <button onClick={postComment} className="bg-black text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0">
            Add Comment
          </button>
        </div>
        </div>}
        <Footer/>
    </div>
  )
}

export default PostDetails
