import { useEffect, useRef } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProfilePosts from "../components/ProfilePosts";
import { useSelector, useDispatch } from "react-redux"; // Import Redux hooks
import { handleGetPostsByUser } from "../features/postDataSlice";
import { handleUpdateProfileUser } from "../features/userDataSlice";
import Loader from "../components/Loader";
import { SocketListenerRoom } from "../functions/SocketHelper";
import { setPostsByUser } from "../features/postDataSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  //user redux
  const user = useSelector((state) => state.userData.user); 
  const updateProfileUser = useSelector((state) => state.userData.updateProfileUser);
  const updateProfileUserStatusMessage = useSelector((state) => state.userData.updateProfileUserStatusMessage);
  
  //post redux
  const posts = useSelector((state) => state.postData.getPostByUser);
  const getPostsByUserStatus = useSelector((state) => state.postData.getPostsByUserStatus);
  const getPostsByUseErrorMessage = useSelector((state) => state.postData.getPostsByUseErrorMessage);

  const handleUserUpdate = async () => {
    try {
     await dispatch(handleUpdateProfileUser({
        user_id: user?.id,
        data: {
          username: usernameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value,
        },
      }));
    } catch (err) {
      console.log("err:",err)
    }
  };

  // Gunakan di dalam useEffect
  useEffect(() => {
    if(user){
      SocketListenerRoom(`userId-${user?.id}`,`${user?.id}-all-posts`, setPostsByUser, dispatch);
    }
  }, [user]);

  useEffect(() => {
    if (getPostsByUserStatus === "idle" && user) {
      dispatch(handleGetPostsByUser(user?.id));
    }
  }, [user, getPostsByUserStatus]);

  return (
    <div>
      <Navbar />
      <div className="min-h-[80vh] px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start items-start">
        <div className="px-8 md:px-[200px] min-h-[80vh]">
          {getPostsByUserStatus === "loading" ? (
            <div className="h-[40vh] flex justify-center items-center">
              <Loader />
            </div>
          ) : getPostsByUserStatus === "failed" ? (
            <h3 className="text-center font-bold mt-16">{getPostsByUseErrorMessage}</h3>
          ) : (
            posts.map((p) => <ProfilePosts key={p.id} p={p} />)
          )}
        </div>

        <div className="md:sticky md:top-12 flex justify-start md:justify-end items-start md:w-[30%] w-full md:items-end">
          <div className="flex flex-col space-y-4 items-start">
            <h1 className="text-xl font-bold mb-4">Profile</h1>
            <input
              ref={usernameRef}
              defaultValue={user?.username}
              className="outline-none px-4 py-2 text-gray-500"
              placeholder="Your username"
              type="text"
            />
            <input
              ref={emailRef}
              defaultValue={user?.email}
              className="outline-none px-4 py-2 text-gray-500"
              placeholder="Your email"
              type="email"
            />
            <input
              ref={passwordRef}
              className="outline-none px-4 py-2 text-gray-500"
              placeholder="Your password"
              type="password"
            />
            <div className="flex items-center space-x-4 mt-8">
              <button onClick={handleUserUpdate} disabled={updateProfileUser === 'loading'} className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400">
                Update
              </button>
            </div>
            {updateProfileUser === 'succeeded' && <h3 className="text-green-500 text-sm text-center mt-4">User updated successfully!</h3>}
            {updateProfileUserStatusMessage && <h3 className="text-red-500 text-sm text-center mt-4">{updateProfileUserStatusMessage}</h3>}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
