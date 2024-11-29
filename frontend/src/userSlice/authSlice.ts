import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, UserInfo } from "../Types/userTypes";


const getUserInfoFromLocalStorage = (): UserInfo | null => {
  try {
    const userInfoString = localStorage.getItem("userInfo");
    return userInfoString ? (JSON.parse(userInfoString) as UserInfo) : null;
  } catch (error) {
    console.error("Error parsing userInfo from localStorage:", error);
    return null; // Default to null if JSON is invalid or parsing fails
  }
};

const initialState: AuthState = {
  isAuthenticated: false,
  userInfo: getUserInfoFromLocalStorage(),
};


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.userInfo = null;
      state.isAuthenticated = false;
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
