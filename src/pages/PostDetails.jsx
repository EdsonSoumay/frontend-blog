
import { useEffect, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Link } from 'react-router-dom';
import {BiEdit} from 'react-icons/bi'
import Comment from "../components/Comment"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import {MdDelete} from 'react-icons/md'
import { IF } from "../url"
import Loader from "../components/Loader"
import { useDispatch, useSelector } from "react-redux";
import { handleDeletePost, handleGetPost, resetDeletePostStatus } from "../features/postDataSlice"
import { handleCreateComment, handleGetComments, selectCommentsByPostId, setCommentsByPost } from "../features/commentDataSlice"
import { SocketListenerRoom } from "../functions/SocketHelper";

const PostDetails = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const post_id=useParams().id
  const commentRef = useRef(null);

  //user data redux
  const user = useSelector((state) => state.userData.user); 
  
  //post data redux
  const post = useSelector((state) => state.postData.getPostsDetail[post_id]);
  const getPostDetailStatus = useSelector((state) => state.postData.getPostsDetailStatus[post_id]);
  const getPostDetailStatusMessage = useSelector((state) => state.postData.getPostsDetailStatusMessage[post_id]);
  const deletePostStatus = useSelector((state) => state.postData.deletePostStatus);
  const deletePostStatusMessage = useSelector((state) => state.postData.deletePostStatusMessage);
  const isDeletingOrDeletedPost = deletePostStatus === 'loading' || deletePostStatus === 'succeeded';

  //comment data redux
  const comments = useSelector((state) => selectCommentsByPostId(state, post_id));
  const getCommentsStatus =  useSelector((state) => state.commentData.getCommentsStatus[post_id]);
  const getCommentsStatusMessage = useSelector((state) => state.commentData.getCommentsStatusMessage[post_id]);
  const createCommentsStatus =  useSelector((state) => state.commentData.createCommentStatus);
  const deleteCommentStatusMessage = useSelector((state) => state.commentData.deleteCommentStatusMessage);

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
    const comment = commentRef.current.value;
    if (!comment) {
      return null;
    }

    commentRef.current.value = '';
    try {
      await dispatch(handleCreateComment({comment, post_id, user_id: user.id}));
      } catch (err) {
        console.log(err);
      }
  }

  useEffect(()=>{
    if(!post){
      dispatch(handleGetPost(post_id));
    }
  },[post_id, post])

  useEffect(()=>{
    dispatch(handleGetComments(post_id));
  },[post_id])

  
  // Gunakan di dalam useEffect
  useEffect(() => {
    if(post_id){
      SocketListenerRoom(`postId-${post_id}`,`${post_id}-all-comments`, setCommentsByPost, dispatch);
    }
  }, [post_id]);

  return (
    <div>
        <Navbar/>
        {
         getPostDetailStatus  === 'loading'?
          <div className="h-[80vh] flex justify-center items-center w-full"><Loader/></div>
          :
          getPostDetailStatus === 'failed' && getPostDetailStatusMessage ?
          <p className="text-red-500 text-center">{getPostDetailStatusMessage}</p>
          :
          <div className="px-8 md:px-[200px] mt-8">
            <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-black md:text-3xl">{post?.title}</h1>
              {
                user?.id===post?.user_id && 
                <div className="flex items-center justify-center space-x-2">
                  <Link to={`/edit/${post_id}`} state={post} className="cursor-pointer">
                      <BiEdit/>
                  </Link>

                  <button 
                      onClick={!isDeletingOrDeletedPost ? deletePost : null}
                      disabled={isDeletingOrDeletedPost}
                    >
                      <MdDelete className={`${isDeletingOrDeletedPost ? 'text-gray-400' : 'text-black'}`} /> {/* Ubah warna saat penghapusan berlangsung */}
                  </button>

                  {/* Pesan jika ada error */}
                  {deletePostStatusMessage && <p className="text-red-500">{deletePostStatusMessage}</p>}
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
              {
              getCommentsStatus === 'loading' ? (
               <p className="text-gray-500">Loading comments...</p>
              ) : getCommentsStatusMessage &&  getCommentsStatus === 'failed' ? (
              <p className="text-red-500">{getCommentsStatusMessage}</p>
              ) : (
              comments?.map((c) => (
                <Comment key={c.id} c={c} post={post} />
              )))
              }
               {deleteCommentStatusMessage && (
                      <p className="text-red-500">{deleteCommentStatusMessage}</p>
                    )}
          </div>

          {/* write a comment */}
          <div className="w-full flex flex-col mt-4 md:flex-row">
            <input
              ref={commentRef}
              type="text"
              placeholder="Write a comment"
              className="md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0 border border-gray-300 rounded-md"
            />
            <button
              onClick={postComment}
              className="bg-black text-sm text-white px-2 py-2 md:w-[20%] mt-4 md:mt-0"
              disabled={createCommentsStatus ==='loading'}
            >
              Add Comment
            </button>
           </div>
          </div>
        }
        <Footer/>
    </div>
  )
}

export default PostDetails