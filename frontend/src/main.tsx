import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import HomePage from "./Pages/HomePage.tsx";
import BlogPage from "./Pages/BlogPage.tsx";
import BlogsDetailPage from "./Pages/BlogsDetailPage.tsx";
import LoginPage from "./Pages/LoginPage.tsx";
import RegisterPage from "./Pages/RegisterPage.tsx";
import { store } from "./store.ts";
import PrivateRouter from "./Components/PrivateRouter.tsx";
import ProfilePage from "./Pages/profilePage.tsx";
import MyBlogsPage from "./Pages/MyBlogsPage.tsx";
import AddBlogPage from "./Pages/AddBlogPage.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<App />}>
      <Route path="/" index={true} element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route  element={<PrivateRouter />}>
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/blog/:id" element={<BlogsDetailPage />} />
        <Route path="/profile" element={<ProfilePage/>}/>
        <Route path="/my-blogs" element={<MyBlogsPage/>}/>
        <Route path="/create" element={<AddBlogPage/>}/>
      </Route>
    </Route>
  )
);
ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
    ,
  </Provider>
);
