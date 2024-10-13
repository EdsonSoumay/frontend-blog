import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleRegister, resetRegisterStatus } from "../features/userDataSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const [passwordError, setPasswordError] = useState(""); // State untuk validasi password

  const registerStatus = useSelector((state) => state.userData.registerStatus);
  const registerStatusMessage = useSelector((state) => state.userData.registerStatusMessage);

  const handleRegisterUser = async () => {
    try {
      const username = usernameRef.current.value;
      const email = emailRef.current.value;
      const password = passwordRef.current.value;
      const confirmPassword = confirmPasswordRef.current.value;
      const first_name = firstNameRef.current.value;
      const last_name = lastNameRef.current.value;

      // Validasi konfirmasi password
      if (password !== confirmPassword) {
        setPasswordError("Password does not match");
        return;
      }

      setPasswordError(""); // Reset error jika password cocok

      const resultAction = await dispatch(handleRegister({ username, email, password, first_name, last_name }));
      if (handleRegister.fulfilled.match(resultAction)) {
        setTimeout(() => {
          navigate("/login");
          dispatch(resetRegisterStatus());
        }, 3000);
      } else if (handleRegister.rejected.match(resultAction)) {
        setTimeout(() => {
          dispatch(resetRegisterStatus());
        }, 3000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
        <h1 className="text-lg md:text-xl font-extrabold"><Link to="/">Blog Market</Link></h1>
        <h3><Link to="/login">Login</Link></h3>
      </div>
      <div className="w-full flex justify-center items-center h-[80vh]">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
          <h1 className="text-xl font-bold text-left">Create an account</h1>
          <input ref={usernameRef} defaultValue='user' className="w-full px-4 py-2 border-2 border-black outline-0" type="text" placeholder="Enter your username" />
          <input ref={emailRef} defaultValue='email@gmail.com' className="w-full px-4 py-2 border-2 border-black outline-0" type="text" placeholder="Enter your email" />
          <input ref={firstNameRef} defaultValue='fn123' className="w-full px-4 py-2 border-2 border-black outline-0" type="text" placeholder="Enter your first name" />
          <input ref={lastNameRef} defaultValue='' className="w-full px-4 py-2 border-2 border-black outline-0" type="text" placeholder="Enter your last name" />
          <input ref={passwordRef} defaultValue='1234' className="w-full px-4 py-2 border-2 border-black outline-0" type="password" placeholder="Enter your password" />
          <input ref={confirmPasswordRef} defaultValue='1234' className="w-full px-4 py-2 border-2 border-black outline-0" type="password" placeholder="Confirm your password" />
          
          {/* Tampilkan pesan error jika password tidak cocok */}
          {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
          
          <button onClick={handleRegisterUser} disabled={registerStatus === 'loading'} className="w-full px-4 py-4 text-lg font-bold text-white bg-black rounded-lg hover:bg-gray-500 hover:text-black">
            Register
          </button>
          {registerStatusMessage && (<h3 className={registerStatus === 'succeeded' ? "text-green-500 text-sm" : "text-red-500 text-sm"}>{registerStatusMessage}</h3>)}
          <div className="flex justify-center items-center space-x-3">
            <p>Already have an account?</p>
            <p className="text-gray-500 hover:text-black"><Link to="/login">Login</Link></p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
