import { Link, useLocation} from "react-router-dom";
import { BsSearch } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa';
import { useState } from "react";
import Menu from "./Menu";
import { useDispatch, useSelector } from "react-redux"; 
import { setSearchQuery } from "../features/sharedDataSlice";


const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const dispatch = useDispatch(); 
  const location = useLocation();
  const currentRoute = location.pathname; // Ini akan memberi Anda path dari route saat ini

  const searchQuery = useSelector((state) => state.sharedData.searchQuery);
  const [prompt, setPrompt] = useState(searchQuery); 

  // Ambil data user dari Redux
  const user = useSelector((state) => state.userData.user);

  const showMenu = () => {
    setMenu(!menu);
  };

  const handleSearch = () => {
    dispatch(setSearchQuery(prompt));
  };

  return (
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
      <h1 className="text-lg md:text-xl font-extrabold">
        <Link to="/">Blog Market</Link>
      </h1>
      {
        currentRoute === '/' &&
         <div className="flex justify-center items-center space-x-2">
        <p onClick={handleSearch} className="cursor-pointer p-2">
          <BsSearch />
        </p>
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="outline-none px-3 py-2 border border-gray-300 rounded-md"
          placeholder="Search a post"
          type="text"
        />
        </div>
      }
      <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
        {user ? (
          <h3>
            <Link to="/write">Write</Link>
          </h3>
        ) : (
          <h3>
            <Link to="/login">Login</Link>
          </h3>
        )}
        {user ? (
          <div onClick={showMenu}>
            <p className="cursor-pointer relative">
              <FaBars />
            </p>
            {menu && <Menu />}
          </div>
        ) : (
          <h3>
            <Link to="/register">Register</Link>
          </h3>
        )}
      </div>
      <div onClick={showMenu} className="md:hidden text-lg">
        <p className="cursor-pointer relative">
          <FaBars />
        </p>
        {menu && <Menu />}
      </div>
    </div>
  );
};

export default Navbar;
