import { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from "../../../assets/logo.png";
import {
  MdAddTask,
  MdDarkMode,
  MdOutlineLightMode,
  MdOutlineTask,
} from "react-icons/md";
import { BsListTask } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { AuthProvider } from "../../../contexts/AuthContext";
import { toast } from "react-hot-toast";
import userImg from "../../../assets/userImg.jpg";
import { DarkModeProvider } from "../../../contexts/DarkModeContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user, LogOut } = useContext(AuthProvider);
  const { theme, toggleTheme } = useContext(DarkModeProvider);

  const handleSignOut = () => {
    LogOut()
      .then(() => {
        toast.success("Successfully Logout");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  const navMenu = (
    <>
      <li>
        <NavLink
          to="/"
          className={`font-bold flex justify-center items-center gap-1 ${({
            isActive,
          }) => (isActive ? "active" : undefined)}`}
        >
          <MdAddTask size={20}></MdAddTask>
          <span className="text-sm">Add Task</span>
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/MyTask"
          className={`font-bold flex justify-center items-center gap-1 ${({
            isActive,
          }) => (isActive ? "active" : undefined)}`}
        >
          <BsListTask size={20}></BsListTask>
          <span className="text-sm">My Task</span>
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/CompletedTask"
          className={`font-bold flex justify-center items-center gap-1 ${({
            isActive,
          }) => (isActive ? "active" : undefined)}`}
        >
          <MdOutlineTask size={20}></MdOutlineTask>
          <span className="text-sm">Completed Task</span>
        </NavLink>
      </li>

      {user?.uid ? (
        <div className="dropdown relative flex justify-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex justify-center items-center px-4 py-2 bg-blue-600 text-white font-medium text-xs rounded shadow-md hover:bg-blue-700"
            type="button"
          >
            <span className="text-sm">
              {user?.displayName ? user?.displayName : "Anonymous"}
            </span>
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="caret-down"
              className="w-2 ml-2"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 512"
            >
              <path
                fill="currentColor"
                d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
              ></path>
            </svg>
          </button>

          {isOpen && (
            <ul
              className="dropdown-menu px-2 absolute bg-white text-base z-50 py-2 list-none text-left rounded-lg shadow-lg border-none"
              style={{ top: "100%" }} // Ensure dropdown is placed below the button
            >
              <li className="flex justify-center items-center">
                <img
                  className="rounded-full border"
                  style={{ height: "30px", width: "30px" }}
                  src={user?.photoURL ? user.photoURL : userImg}
                  referrerPolicy="no-referrer"
                  alt="userImage"
                />
                <span className="text-black text-sm px-2 w-36">
                  {user?.displayName ? user?.displayName : "Anonymous"}
                </span>
              </li>
              <hr className="border-gray-400 mt-2" />
              <li>
                <button
                  onClick={handleSignOut}
                  className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      ) : (
        <NavLink
          to="/Login"
          className={`font-bold flex justify-center items-center gap-1 ${({
            isActive,
          }) => (isActive ? "active" : undefined)}`}
        >
          <FaUserCircle size={20}></FaUserCircle>
          <span className="text-sm">Login</span>
        </NavLink>
      )}

      <li className="flex justify-center items-center">
        {theme === "light" ? (
          <button onClick={toggleTheme}>
            <MdDarkMode size={25}></MdDarkMode>
          </button>
        ) : (
          <button onClick={toggleTheme}>
            <MdOutlineLightMode size={25}></MdOutlineLightMode>
          </button>
        )}
      </li>
    </>
  );

  return (
    <div
      className={`px-4 py-3 mx-auto sm:max-w-xl md:max-w-full lg:mx-14 md:px-10 mt-4 rounded-lg ${
        theme === "light" ? "navbar" : "dark-navbar"
      }`}
    >
      <div className="relative flex items-center justify-between">
        <Link to="/" className="inline-flex items-center">
          <img src={logo} width={50} height={20} alt="logo" />
          <span
            className={`ml-2 text-xl ${
              theme === "light" ? "text-black" : "text-white"
            } sm:text-2xl font-bold`}
          >
            Task{" "}
            <span
              className={`${
                theme === "light" ? "text-blue-600" : "text-blue-500"
              }`}
            >
              Tracker
            </span>
          </span>
        </Link>

        <ul
          className={`flex items-center ${
            theme === "light" ? "text-violet-500" : "text-white"
          } hidden space-x-6 lg:flex py-3`}
        >
          {navMenu}
        </ul>

        <div className="lg:hidden">
          <button
            aria-label="Open Menu"
            title="Open Menu"
            className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
            onClick={() => setIsMenuOpen(true)}
          >
            <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
              />
              <path
                fill="currentColor"
                d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
              />
              <path
                fill="currentColor"
                d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
              />
            </svg>
          </button>

          {isMenuOpen && (
            <div className="absolute top-0 left-0 w-full shadow-2xl">
              <div
                className={`p-5 ${
                  theme === "light" ? "bg-gray-50" : "bg-darkBlack"
                } border rounded shadow-sm`}
              >
                <div className="flex items-center justify-center mb-4">
                  <div>
                    <Link to="/" className="inline-flex items-center">
                      <span
                        className={`ml-2 text-xl font-bold ${
                          theme === "light" ? "text-black" : ""
                        }`}
                      >
                        Task <span className="text-blue-600">Tracker</span>
                      </span>
                    </Link>
                  </div>

                  <div>
                    <button
                      aria-label="Close Menu"
                      title="Close Menu"
                      className="p-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                <nav className="text-center">
                  <ul
                    className={`${
                      theme === "light" ? "text-violet-500" : "text-white"
                    } space-y-4`}
                  >
                    {navMenu}
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
