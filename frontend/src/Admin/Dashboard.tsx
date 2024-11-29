import { Link, Outlet } from "react-router-dom";
import { MdPeople, MdOutlineArticle } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { useSelector } from "react-redux";

export const Dashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);  

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="flex">
      <div className="w-1/5 bg-gray-100 h-auto p-5">
        <h2 className="text-2xl font-bold mb-10 text-blue-900">Admin Dashboard</h2>
        <nav className="space-y-6">
          {userInfo?.role === "admin" && (
            <>
              <Link
                to="admin" 
                className="flex items-center gap-2 text-lg font-medium text-blue-900"
              >
                <MdPeople className="text-2xl" />
                Dashboard
              </Link>
              <Link
                to="users"
                className="flex items-center gap-2 text-lg font-medium text-blue-900"
              >
                <MdPeople className="text-2xl" />
                Users
              </Link>
              <Link
                to="admin-blog"
                className="flex items-center gap-2 text-lg font-medium text-blue-900"
              >
                <MdOutlineArticle className="text-2xl" />
                Blogs
              </Link>
            </>
          )}
          <a
            onClick={handleLogout}
            className="flex items-center gap-2 text-lg font-medium text-red-500 cursor-pointer"
          >
            <CiLogout className="text-2xl" />
            Logout
          </a>
        </nav>
      </div>


      <div className="w-4/5 p-5">
        <Outlet /> 
      </div>
    </div>
  );
};
