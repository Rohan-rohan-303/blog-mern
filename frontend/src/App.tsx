import "./App.css";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "./components/Header.ts";
import Login from "./components/Login.ts";
import Blogs from "./components/Blogs.ts";
import UserBlogs from "./components/UserBlogs.ts";
import AddBlogs from "./components/AddBlogs.ts";
import BlogDetail from "./components/BlogDetail.tsx";
import {login, logout} from "./store/index.ts";

import React from 'react'

const App = () => {
  return (
    <div>App</div>
  )
}

export default App

