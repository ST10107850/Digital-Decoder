import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllUserQuery, useUpdateUserStatusMutation } from "../userSlice/usersApiSlice";
import { UserInfo } from "../Types/userTypes";  

export const Users = () => {
  const navigate = useNavigate();

  const { data, error, isLoading } = useGetAllUserQuery();
  const [updateUserStatus] = useUpdateUserStatusMutation(); 

  const [users, setUsers] = useState<UserInfo[]>([]);

  useEffect(() => {
    console.log("API Response:", data);
  }, [data]);

  useEffect(() => {
    if (data?.data) {
      setUsers(data.data); 
    }
  }, [data]);

  const [showFullUsers, setShowFullUsers] = useState(false);

  const goToUsersPage = () => {
    navigate("/users"); 
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      // Attempt to update the user status
      const updatedUser = await updateUserStatus({ id, status }).unwrap();
  
      // Update the local state
      setUsers((prev) =>
        prev.map((user) =>
          user._id === id
            ? { ...user, status: updatedUser.status } 
            : user
        )
      );
  
      alert(`User status updated to ${status}`);
    } catch (error) {
      // Log the error for debugging
      console.error("Error updating user status:", error);
  
      // Show a user-friendly message
      alert(error?.data?.message || "Failed to update status");
    }
  };
  

  if (isLoading) return <div>Loading...</div>;
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
