import { MdDelete } from "react-icons/md"
import { handleDeleteComment } from "../features/commentDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { resetDeleteCommentStatus } from "../features/commentDataSlice";
import { SocketListenerRoom } from "../functions/SocketHelper";
import { setCommentsByPost } from "../features/commentDataSlice";

const Comment = ({c}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userData.user); 
  const deleteCommentStatus = useSelector((state) => state.commentData.deleteCommentStatus);

  const deleteCommentHandle=async(id)=>{
    try{
      const resultAction = await dispatch(handleDeleteComment(id));
      if (handleDeleteComment.fulfilled.match(resultAction)){
        // console.log("Produk berhasil disimpan:", resultAction.payload);
          setTimeout(() => {
            dispatch(resetDeleteCommentStatus());
          }, 2000);
      }
      // Jika ada error (rejected), tampilkan error dari resultAction
      else if (handleDeleteComment.rejected.match(resultAction)){
        // console.log("Error saat menyimpan produk:", resultAction.error.message);
        setTimeout(() => {
          dispatch(resetDeleteCommentStatus());
        }, 2000);
      }
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div className="px-2 py-2 bg-gray-200 rounded-lg my-2">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-600">@{c.user.username}</h3>
        <div className="flex justify-center items-center space-x-4">
          <p>{new Date(c.updatedAt).toString().slice(0,15)}</p>
          <p>{new Date(c.updatedAt).toString().slice(16,24)}</p>
          {
            user?.id===c?.user_id ?
            <div className="flex items-center justify-center space-x-2">
              <button  onClick={()=>deleteCommentHandle(c.id)} disabled={deleteCommentStatus === 'loading'}><MdDelete/></button>
            </div>:""
          }
        </div>
      </div>
      <p className="px-4 mt-2">{c.comment}</p>
    </div>
  )
}

export default Comment