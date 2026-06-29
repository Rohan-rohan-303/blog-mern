import {useEffect, useState, type JSX} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import {logout, login, toggleTheme} from '../store/index.ts';
import {Sun, Moon} from "lucide-react";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useSelector((state: any) => state.auth.isLoggedIn);
  const isDarkMode = useSelector((state: any) => state.theme.isDarkMode);

  const [activeLink, setActiveLink] = useState<string>('/blogs');

  useEffect(() => {
    const savedTheme = localStorage.getItem('isDarkMode');
    if (savedTheme !== null) {
      const shouldUseDarkMode = JSON.parse(savedTheme) as boolean;

      if (shouldUseDarkMode !== isDarkMode) {
        dispatch(toggleTheme());
      }

      if(shouldUseDarkMode) {
        document.body.classList.add('dark');
      }else {
        document.body.classList.remove('dark');
      }
      

      // Apply the saved theme
    }

  }, [dispatch]);

  //highlighting the active link
  useEffect(() => {
    const currentPath = location.pathname;
    if(currentPath.startsWith('/blogs/add')) {
      setActiveLink('/blog/add');
    }
    else if(currentPath.startsWith('/blogs')) {
      setActiveLink('/blogs');
    }
  }, [location.pathname]);



  //handling theme logic
  const handleThemeToggle = () => {
    const newTheme = !isDarkMode;
    dispatch(toggleTheme());
    localStorage.setItem('isDarkMode', JSON.stringify(newTheme));

    if(newTheme) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }




}
