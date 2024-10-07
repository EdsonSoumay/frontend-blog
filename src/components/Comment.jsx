import { MdDelete } from "react-icons/md"
import { deleteComment } from "../request"
import { useSelector } from "react-redux"; // Import Redux hooks

const Comment = ({c,post}) => {
  const user = useSelector((state) => state.userData.user); // Mengambil user dari Redux store

  const deleteCommentHandle=async(id)=>{
    try{
      deleteComment(id)
      window.location.reload(true)
    }
    catch(err){
      console.log(err)
    }
  }
  // console.log(post.user_id)
  // console.log(user.id)
  // console.log(post)
  // console.log(user)
  return (
    <div className="px-2 py-2 bg-gray-200 rounded-lg my-2">
           <div className="flex items-center justify-between">
            <h3 className="font-bold text-gray-600">@{c.user.username}</h3>
            <div className="flex justify-center items-center space-x-4">
            <p>{new Date(c.updatedAt).toString().slice(0,15)}</p>
            <p>{new Date(c.updatedAt).toString().slice(16,24)}</p>
            {user?.id===c?.user_id ?
              <div className="flex items-center justify-center space-x-2">
                    <p className="cursor-pointer" onClick={()=>deleteCommentHandle(c.id)}><MdDelete/></p>
                </div>:""}
                
            </div>
           </div>
           <p className="px-4 mt-2">{c.comment}</p>

           </div>
  )
}

export default Comment