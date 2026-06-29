import "./App.css";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import {Header} from "./components/Header.ts";
import Login from "./components/Login.ts";
import Blogs from "./components/Blogs.ts";
import UserBlogs from "./components/UserBlogs.ts";
import AddBlogs from "./components/AddBlogs.ts";
import BlogDetail from "./components/BlogDetail.tsx";
import {login, logout} from "./store/index.ts";


function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const userId = window.localStorage.getItem("userId");
    if (userId) {
      dispatch(login(JSON.parse(userId)));
    }

}, [dispatch]);

  return (
    <>  
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-blogs" element={<UserBlogs />} />
        <Route path="/add-blogs" element={<AddBlogs />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
      </Routes>
    
    </>

  );
}

export default App

