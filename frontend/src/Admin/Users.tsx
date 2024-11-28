import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllUserQuery } from "../userSlice/usersApiSlice";
import { UserInfo } from "../Types/userTypes";  // Assuming this is the correct type

export const Users = () => {
  const navigate = useNavigate();

  // Fetch all users using the RTK Query hook
  const { data, error, isLoading } = useGetAllUserQuery();

  // Type the `users` state as an array of `UserInfo`
  const [users, setUsers] = useState<UserInfo[]>([]);

  // Debugging log to inspect the API response
  useEffect(() => {
    console.log("API Response:", data);
  }, [data]);

  useEffect(() => {
    if (data?.data) {
      setUsers(data.data); // Set users data when fetched
    }
  }, [data]);

  const [showFullUsers, setShowFullUsers] = useState(false);

  const goToUsersPage = () => {
    navigate("/users"); // Navigate to the users page
  };

  const toggleUserStatus = (id: number, currentStatus: string) => {
    // Update the user's status locally
    setUsers((prev) =>
      prev.map((user) =>
        user._id === id
          ? {
              ...user,
              status: currentStatus === "inactive" ? "Approve" : "inactive", // Toggle status
            }
          : user
      )
    );
  };

  // Show loading message while data is being fetched
  if (isLoading) return <div>Loading...</div>;

  // Show error message if there is an issue with the API call
  if (error) return <div>Error loading users: {error.message}</div>;

  return (
    <div className="mb-5">
      <h3 className="text-xl font-bold mb-4">New Users Needing Activation</h3>
      <table className="w-full text-left border-collapse border border-white">
        <thead>
          <tr className="bg-[#b0764d] text-white">
            <th className="p-2 border border-white">Name</th>
            <th className="p-2 border border-white">Email</th>
            <th className="p-2 border border-white">Phone Number</th>
            <th className="p-2 border border-white">Date Created</th>
            <th className="p-2 border border-white">Status</th>
            <th className="p-2 border border-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users?.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-2 text-center">
                No users available.
              </td>
            </tr>
          ) : (
            users.slice(0, 4).map((user) => (
              <tr
                key={user._id}
                className={`${
                  user.status === "inactive" ? "bg-slate-50 opacity-100 text-black" : ""
                }`}
              >
                <td className="p-2 border border-white">
                  {user.firstName || user.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : "N/A"}
                </td>
                <td className="p-2 border border-white">{user.email || "N/A"}</td>
                <td className="p-2 border border-white">{user.phoneNumber || "N/A"}</td>
                <td className="p-2 border border-white">{user.createdAt || "N/A"}</td>
                <td className="p-2 border border-white">{user.status || "N/A"}</td>
                <td className="p-2 border border-white">
                  <button
                    onClick={() => toggleUserStatus(user._id, user.status)}
                    className={`px-3 py-1 text-white rounded ${
                      user.status === "Approve" ? "bg-blue-500" : "bg-green-500"
                    }`}
                  >
                    {user.status === "Approve" ? "Approve" : "Activate"}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {!showFullUsers && (
        <button
          onClick={() => setShowFullUsers(true)}
          className="mt-4 px-4 py-2 text-white bg-[#b0764d] rounded"
        >
          Show All Users
        </button>
      )}
      {showFullUsers && (
        <button
          onClick={goToUsersPage}
          className="mt-4 px-4 py-2 text-white bg-[#b0764d] rounded"
        >
          Go to Users Page
        </button>
      )}
    </div>
  );
};
