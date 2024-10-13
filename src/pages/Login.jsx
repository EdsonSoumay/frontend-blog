import { Link, useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import { useRef } from "react"
import { setUserData, resetLoginStatus } from "../features/userDataSlice"
import { useDispatch, useSelector} from "react-redux"; 
import { handleLogin } from "../features/userDataSlice"
import { resetGetPostsStatus } from "../features/postDataSlice";

const Login = () => {
  const navigate=useNavigate()
  const dispatch = useDispatch();

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  
  const loginStatus = useSelector((state) => state.userData.loginStatus);
  const loginStatusMessage = useSelector((state) => state.userData.loginStatusMessage);

  const handleLoginUser=async()=>{
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    try {
      const resultAction = await dispatch(handleLogin({ username, password }));
      if (handleLogin.fulfilled.match(resultAction)) {
          dispatch(setUserData(resultAction.payload)); // Dispatch action setUser dengan data pengguna
          dispatch(resetLoginStatus());
          dispatch(resetGetPostsStatus())
          navigate("/")
      } else if (handleLogin.rejected.match(resultAction)) {
        setTimeout(() => {
          dispatch(resetLoginStatus());
        }, 2000);
      }
    } catch (err) {
      console.log(err)
    }

  }
  return (
    <>
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
    <h1 className="text-lg md:text-xl font-extrabold"><Link to="/">Blog Market</Link></h1>
    <h3><Link to="/register">Register</Link></h3>
    </div>
    <div className="w-full flex justify-center items-center h-[80vh] ">
       <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
         <h1 className="text-xl font-bold text-left">Log in to your account</h1>
         <input ref={usernameRef}  defaultValue={'user'} className="w-full px-4 py-2 border-2 border-black outline-0" type="text" placeholder="Enter your username" />
         <input ref={passwordRef} defaultValue={'1234'} className="w-full px-4 py-2 border-2 border-black outline-0" type="password" placeholder="Enter your password" />
         <button disabled={loginStatus ==='loading'} onClick={handleLoginUser} className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black ">Log in</button>
         {loginStatus === 'failed' && <h3 className="text-red-500 text-sm ">{loginStatusMessage}</h3>}
         <div className="flex justify-center items-center space-x-3">
          <p>New here?</p>
          <p className="text-gray-500 hover:text-black"><Link to="/register">Register</Link></p>
         </div>
       </div>
    </div>
    <Footer/>
    </>
  )
}

export default Login