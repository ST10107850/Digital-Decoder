import { Link, Outlet } from "react-router-dom";
import { MdPeople, MdOutlineArticle } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import DashboardContent from "./DashboardContent";

export const Dashboard = () => {
  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-100 h-screen p-5">
        <h2 className="text-2xl font-bold mb-10 text-blue-900">
          Admin Dashboard
        </h2>
        <nav className="space-y-6">
        <Link
            to="admin" // Correct relative path
            className="flex items-center gap-2 text-lg font-medium text-blue-900"
          >
            <MdPeople className="text-2xl" />
            Dashboard
          </Link>
          <Link
            to="users" // Correct relative path
            className="flex items-center gap-2 text-lg font-medium text-blue-900"
          >
            <MdPeople className="text-2xl" />
            Users
          </Link>
          <Link
            to="admin-blog" // Correct relative path
            className="flex items-center gap-2 text-lg font-medium text-blue-900"
          >
            <MdOutlineArticle className="text-2xl" />
            Blogs
          </Link>
          <a
            onClick={handleLogout}
            className="flex items-center gap-2 text-lg font-medium text-red-500 cursor-pointer"
          >
            <CiLogout className="text-2xl" />
            Logout
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-4/5 p-5">
        <Outlet /> 
      </div>
    </div>
  );
};
