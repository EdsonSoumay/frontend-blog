import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import Redux hooks
import { Link, useNavigate } from "react-router-dom";
import { logout as logoutRequest } from "../request"; // Sesuaikan import logout jika diperlukan
import { clearUserData } from "../features/userDataSlice";

const Menu = () => {
  const dispatch = useDispatch(); // Inisialisasi useDispatch
  const navigate = useNavigate();
  const user = useSelector((state) => state.userData.user); // Mengambil user dari Redux store

  const handleLogout = async () => {
    try {
      await logoutRequest(); // Panggil fungsi logout
      dispatch(clearUserData()); // Dispatch action untuk menghapus user dari Redux store
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-black w-[200px] z-10 flex flex-col items-start absolute top-12 right-6 md:right-32 rounded-md p-4 space-y-4">
      {!user && (
        <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
          <Link to="/login">Login</Link>
        </h3>
      )}
      {!user && (
        <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
          <Link to="/register">Register</Link>
        </h3>
      )}
      {user && (
        <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
          <Link to={"/profile/" + user.id}>Profile</Link>
        </h3>
      )}
      {user && (
        <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
          <Link to="/write">Write</Link>
        </h3>
      )}
      {user && (
        <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
          <Link to={"/myblogs/" + user.id}>My blogs</Link>
        </h3>
      )}
      {user && (
        <h3 className="text-white text-sm hover:text-gray-500 cursor-pointer">
          <Link to="/categories">Categories</Link>
        </h3>
      )}
      {user && (
        <h3
          onClick={handleLogout}
          className="text-white text-sm hover:text-gray-500 cursor-pointer"
        >
          Logout
        </h3>
      )}
    </div>
  );
};

export default Menu;
