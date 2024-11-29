import React, { useEffect, useState } from "react";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../userSlice/usersApiSlice";
import { RootState } from "../Types/userTypes";
import { setCredentials } from "../userSlice/authSlice";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fixed the mutation hook usage
  const [login] = useLoginMutation();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (userInfo?.role === "author") {
      navigate("/blogs");
    } else if (userInfo?.role === "admin") {
      navigate("/admin");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await login({ email, password }).unwrap(); // Using .unwrap() to handle the response
      dispatch(setCredentials({ ...res }));
      alert("Logged in successfully");
      navigate("/");
    } catch (err) {
      alert(err?.data?.message || err?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#b0764d] flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[50vw] ">
        <h1 className="text-[#b0764d] text-3xl font-semibold text-center mb-6">
          Login
        </h1>

        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label htmlFor="email" className="text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email} // Bound value to the email state
              onChange={(e) => setEmail(e.target.value)} // Update state on change
              className="w-full p-3 mt-2 rounded-lg bg-[#b0764d] text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="text-white block mb-2">
              Password
            </label>
            <div className="flex items-center bg-[#b0764d] rounded-lg">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                value={password} // Bound value to the password state
                onChange={(e) => setPassword(e.target.value)} // Update state on change
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

          <button
            type="submit" // Added type="submit" to trigger form submission
            className="w-full py-3 bg-orange-500 text-white rounded-lg mt-4 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-black">
            Don't have an account?{" "}
            <a href="#" className="text-[#b0764d] hover:text-orange-400">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
