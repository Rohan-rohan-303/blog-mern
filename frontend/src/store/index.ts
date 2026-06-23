import {configureStore, createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
interface AuthState {
  isLoggedIn: boolean;
};

const initialAuthState: AuthState = { 
  isLoggedIn: false 
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      localStorage.removeItem("userId");
      state.isLoggedIn = false;
    }
  }
});

interface themeState {
  isDarkMode: boolean;
}

const initialThemeState: themeState = {
  isDarkMode: false
};

const themeSlice = createSlice({
  name: "theme",
  initialState: initialThemeState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
    }
  }
});

export const authActions = authSlice.actions;
export const { toggleTheme } = themeSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    theme: themeSlice.reducer
  }
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;