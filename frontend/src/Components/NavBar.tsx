import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi"; // Logout icon
import logo from "../assets/D.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Types/userTypes";
import { useState } from "react";
import { useLogoutUserMutation } from "../userSlice/usersApiSlice";
import { logout } from "../userSlice/authSlice";

const NavBar = () => {
  const navLinksStyles =
    "block py-2 px-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0";

  const { userInfo } = useSelector((state: RootState) => state.auth);

  console.log("userInfo in NavBar:", userInfo);

  const [isDropdown, setIsDropdown] = useState(false);

  const toggleDropdown = () => setIsDropdown((prev) => !prev);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutUser] = useLogoutUserMutation();

  const logoutHandler = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      alert(error?.data?.message || error?.message || "Something went wrong");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-transparent text-black">
      <nav>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <div className="w-[120px] h-16 rounded-md">
              <img
                src={logo}
                alt="Logo"
                className="object-cover w-full h-full rounded-md"
              />
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="items-center justify-between hidden w-full md:flex md:w-auto">
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 rounded-lg bg-transparent md:space-x-20 rtl:space-x-reverse md:flex-row">
              <li>
                <a href="/" className={navLinksStyles}>
                  Home
                </a>
              </li>
              <li>
                <a href="#" className={navLinksStyles}>
                  About
                </a>
              </li>
              <li>
                <Link to="/blogs" className={navLinksStyles}>
                  Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Buttons with Icons */}
          <div className="flex items-center space-x-3 md:space-x-6">
            {userInfo ? (
              <>
                <div className="relative text-white">
                  {/* Profile Dropdown Trigger */}
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center space-x-2 bg-transparent hover:text-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300"
                  >
                    <CgProfile className="w-6 h-6" />
                    <span>
                      {userInfo.firstName && userInfo.lastName
                        ? `${userInfo.firstName} ${userInfo.lastName}`
                        : userInfo.email}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdown && (
                    <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-50">
                      <ul className="py-2">
                        <li>
                          <Link
                            to="/profile"
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                            onClick={() => setIsDropdown(false)}
                          >
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/my-blogs"
                            className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                            onClick={() => setIsDropdown(false)}
                          >
                            My Blogs
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={logoutHandler}
                            className="w-full text-left block px-4 py-2 text-gray-800 hover:bg-gray-100"
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300"
                >
                  <FaSignInAlt className="w-5 h-5" />
                  <span>Login</span>
                </Link>

                {/* Register Button */}
                <Link
                  to="/register"
                  className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300"
                >
                  <FaUserPlus className="w-5 h-5" />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
