import React, { useEffect, useState } from "react";
import { CameraIcon, TrashIcon } from "@heroicons/react/outline"; // Import TrashIcon
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Types/userTypes";
import ProfileImage from "../assets/"
import { useRemoveAccountMutation, useUpdateUserMutation } from "../userSlice/usersApiSlice";
import { logout, setCredentials } from "../userSlice/authSlice";
import { Navigate, useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [image, setProfileImage] = useState("null");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [password, setPassword] = useState(""); 
  const [conPass, setConPass] = useState(" ");
 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateUser] = useUpdateUserMutation();
  const [removeAccount] = useRemoveAccountMutation();

  const {userInfo} = useSelector((state: RootState) => state.auth);


  useEffect(() =>{
    if(userInfo){
      setProfileImage(userInfo.image);
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setPhoneNumber(userInfo.phoneNumber);
      setEmail(userInfo.email)
      setStatus(userInfo.status);
    }
  }, [userInfo])

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  const removeAccountHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        await removeAccount({id: userInfo?._id}).unwrap(); 
        dispatch(logout());
        navigate("/"); 
        alert("Your account has been removed successfully.");
      } catch (error: any) {
        alert(error?.data?.message || error?.message || "Failed to remove account.");
      }
    }
  };

  const submitHandler = async(e: React.FormEvent)=>{
    e.preventDefault();
    // if(password !== conPass){
    //   alert("Password do not match");
    // }else{
      if(userInfo){
        try {
          const updateUsers = await updateUser({
            _id: userInfo._id,
            firstName,
            lastName,
            phoneNumber,
            email,
            password,
            image
          }).unwrap();

          dispatch(setCredentials(updateUsers.data));
          alert("Profile updated successfully");
        } catch (error) {
          alert(err?.data?.message || err?.message || 'Something went wrong');
  
        }
      // }
    }
  }

  return (
    <div className="min-h-screen bg-gray-800 flex justify-center items-center py-12">
      <div className="bg-gray-900 w-full max-w-lg p-8 rounded-xl shadow-lg">
        {/* Profile Header */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <img
              src={image || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-32 h-32 rounded-full border-4 border-gray-700 object-cover"
            />
            <label
              htmlFor="profile-pic"
              className="absolute bottom-0 right-0 p-2 bg-gray-800 rounded-full cursor-pointer"
            >
              <CameraIcon className="w-6 h-6 text-white" />
            </label>
            <input
              type="file"
              id="profile-pic"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>

        {/* Personal Information Form */}
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="text-gray-400">Full Name</label>
            <input
              type="text"
              id="name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full p-3 mt-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div>
            <label htmlFor="name" className="text-gray-400">Last Name</label>
            <input
              type="text"
              id="name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter your last name"
              className="w-full p-3 mt-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <label htmlFor="name" className="text-gray-400">Phone Number</label>
            <input
              type="text"
              id="name"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full p-3 mt-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          

          <div>
            <label htmlFor="email" className="text-gray-400">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 mt-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

         
        
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6 items-center">
          <div className="flex items-center space-x-2">
            {/* Remove Account with Trash Icon */}
            <button
            onClick={removeAccountHandler}
            className="py-3 px-4 text-red-600 rounded-lg hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center"
          >
            <TrashIcon className="w-5 h-5 mr-2" />
            Remove Account
          </button>
          </div>

          <div className="flex space-x-4">
            <button onClick={submitHandler} className="w-full py-3 px-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400">
              Save 
            </button>
            <button className="w-full py-3 px-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
