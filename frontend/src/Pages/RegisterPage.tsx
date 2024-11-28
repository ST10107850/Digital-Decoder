import React, { useEffect, useState } from "react";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterUserMutation } from "../userSlice/usersApiSlice";
import { RootState } from "../Types/userTypes";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../userSlice/authSlice";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConPasswordVisibility = () =>
    setShowConPassword(!showConPassword);

  const [role, setRole] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>(" ");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fixed the mutation hook usage
  const [registerUser] = useRegisterUserMutation();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (password !== confirmPassword) {
        alert("Password do not match");
      } else {
        const res = await registerUser({ role, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        alert("User Registered in successfully");
        navigate("/");
      }
    } catch (err) {
      alert(err?.data?.message || err?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex justify-center items-center">
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-full max-w-sm">
        <h1 className="text-white text-3xl font-semibold text-center mb-6">
          Register
        </h1>

        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label htmlFor="role" className="text-gray-400">
              Role
            </label>
            <input
              type="role"
              id="role"
              placeholder="Enter your role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 mt-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="text-gray-400">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="mb-4 relative">
            <label htmlFor="password" className="text-gray-400">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 mt-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <div
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
            >
              {showPassword ? (
                <EyeOffIcon className="w-6 h-6" />
              ) : (
                <EyeIcon className="w-6 h-6" />
              )}
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="mb-4 relative">
            <label htmlFor="conPassword" className="text-gray-400">
              Confirm Password
            </label>
            <input
              type={showConPassword ? "text" : "password"}
              id="conPassword"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 mt-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <div
              onClick={toggleConPasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-400"
            >
              {showConPassword ? (
                <EyeOffIcon className="w-6 h-6" />
              ) : (
                <EyeIcon className="w-6 h-6" />
              )}
            </div>
          </div>

          <button className="w-full py-3 bg-orange-500 text-white rounded-lg mt-4 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400">
            Register
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Already have an account?
            <a href="/login" className="text-orange-500 hover:text-orange-400">
              {" "}
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
