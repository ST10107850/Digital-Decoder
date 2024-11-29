import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  useGetAllUserQuery,
  useUpdateUserStatusMutation,
} from "../userSlice/usersApiSlice";
import { UserInfo } from "../Types/userTypes";

export const Users = ({ isDashboard = false }) => {
  const { data, error, isLoading } = useGetAllUserQuery();
  const [updateUserStatus] = useUpdateUserStatusMutation();

  const [users, setUsers] = useState<UserInfo[]>([]);
  const [statusFilter, setStatusFilter] = useState(""); // State for status filter
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  useEffect(() => {
    if (data?.data) {
      setUsers(data.data);
    }
  }, [data]);

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const updatedUser = await updateUserStatus({ id, status }).unwrap();
      setUsers((prev) =>
        prev.map((user) =>
          user._id === id ? { ...user, status: updatedUser.status } : user
        )
      );
      alert(`User status updated to ${status}`);
    } catch (error) {
      alert(error?.data?.message || "Failed to update status");
    }
  };

  // Filtered users based on status and search query
  const filteredUsers = users.filter((user) => {
    const matchesStatus = statusFilter ? user.status === statusFilter : true;
    const matchesSearchQuery =
      searchQuery &&
      (user.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesStatus && (searchQuery ? matchesSearchQuery : true);
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users: {error.message}</div>;

  return (
    <div className="mb-5 mt-10">
      <h3 className="text-xl font-bold mb-4">New Users Needing Activation</h3>

      {/* Filter and Search Section */}
      <div className="mb-4">
        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded mr-4"
        >
          <option value="">All Status</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded"
        />
      </div>

      {/* Users Table */}
      <table className="w-full text-left border-collapse border border-white">
        <thead>
          <tr className="bg-[#b0764d] text-white">
            <th className="p-2 border border-white">Name</th>
            <th className="p-2 border border-white">Email</th>
            <th className="p-2 border border-white">Phone Number</th>
            <th className="p-2 border border-white">Date Created</th>
            <th className="p-2 border border-white">Status</th>
            <th className="p-2 border border-white">Role</th>
            <th className="p-2 border border-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers?.length === 0 ? (
            <tr>
              <td colSpan={7} className="p-2 text-center">
                No users found matching the filter or search criteria.
              </td>
            </tr>
          ) : (
            (isDashboard ? filteredUsers.slice(0, 5) : filteredUsers).map(
              (user) => (
                <tr
                  key={user._id}
                  className={`${
                    user.status === "inactive"
                      ? "bg-slate-50 opacity-100 text-black"
                      : ""
                  }`}
                >
                  <td className="p-2 border border-white">
                    {user.firstName || user.lastName
                      ? `${user.firstName} ${user.lastName}`
                      : "N/A"}
                  </td>
                  <td className="p-2 border border-white">
                    {user.email || "N/A"}
                  </td>
                  <td className="p-2 border border-white">
                    {user.phoneNumber || "N/A"}
                  </td>
                  <td className="p-2 border border-white">
                    {user.createdAt || "N/A"}
                  </td>
                  <td className="p-2 border border-white">
                    {user.status || "N/A"}
                  </td>
                  <td className="p-2 border border-white">
                    {user.role || "N/A"}
                  </td>
                  <td className="p-2 border border-white">
                    <button
                      onClick={() => handleUpdateStatus(user._id, "Approved")}
                      className="bg-blue-500 px-3 py-1 text-white rounded"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(user._id, "Rejected")}
                      className="bg-red-500 px-3 py-1 text-white rounded"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              )
            )
          )}
        </tbody>
      </table>

      <Link
        to="/users"
        className={`${
          isDashboard ? "block" : "hidden"
        } mt-4 px-4 py-2 text-white bg-[#b0764d] rounded w-[140px]`}
      >
        Show All Users
      </Link>
    </div>
  );
};
