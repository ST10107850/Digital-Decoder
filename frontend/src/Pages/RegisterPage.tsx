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
    <div className="min-h-screen bg-[#b0764d] flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[50vw] h-[80vh]">
        <h1 className="text-[#b0764d] text-3xl font-semibold text-center mb-3">
          Register
        </h1>

        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label htmlFor="role" className="text-white">
              Role
            </label>
            <input
              type="role"
              id="role"
              placeholder="Enter your role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 mt-2 rounded-lg bg-[#b0764d] text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mt-2 rounded-lg bg-[#b0764d] text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label htmlFor="password" className="text-white block mb-2">
              Password
            </label>
            <div className="flex items-center bg-[#b0764d] rounded-lg">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 p-3 bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-400 rounded-l-lg"
              />
              <div
                onClick={togglePasswordVisibility}
                className="p-3 cursor-pointer text-white"
              >
                {showPassword ? (
                  <EyeOffIcon className="w-6 h-6" />
                ) : (
                  <EyeIcon className="w-6 h-6" />
                )}
              </div>
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="mb-4">
            <label htmlFor="conPassword" className="text-white block mb-2">
              Confirm Password
            </label>
            <div className="flex items-center bg-[#b0764d] rounded-lg">
              <input
                type={showConPassword ? "text" : "password"}
                id="conPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="flex-1 p-3 bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-400 rounded-l-lg"
              />
              <div
                onClick={toggleConPasswordVisibility}
                className="p-3 cursor-pointer text-white"
              >
                {showConPassword ? (
                  <EyeOffIcon className="w-6 h-6" />
                ) : (
                  <EyeIcon className="w-6 h-6" />
                )}
              </div>
            </div>
          </div>

          <button className="w-full py-3 bg-orange-500 text-white rounded-lg mt-4 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400">
            Register
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-[#b0764d]">
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
