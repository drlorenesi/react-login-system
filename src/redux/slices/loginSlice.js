import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../middleware/api';
import { setAuthToken } from '../../services/authService';

const initialState = {
  loading: false,
  loginError: null,
  registerError: null,
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    userLogin: (state, action) => {
      state.loading = true;
    },
    userLogInSuccess: (state, action) => {
      state.loading = false;
      state.loginError = null;
      const token = action.payload.headers['x-auth-token'];
      setAuthToken(token);
      window.location = '/';
    },
    userLogInFailed: (state, action) => {
      state.loading = false;
      state.loginError = 'Invalid email or password.';
    },
    registerUserSuccess: (state, action) => {
      state.loading = false;
      state.registerError = null;
      const token = action.payload.headers['x-auth-token'];
      setAuthToken(token);
      window.location = '/';
    },
    registerUserFailed: (state, action) => {
      state.loading = false;
      state.registerError = 'Please use another email.';
    },
  },
});

export const {
  userLogin,
  userLogInSuccess,
  userLogInFailed,
  registerUserSuccess,
  registerUserFailed,
} = loginSlice.actions;

export default loginSlice.reducer;

export const loginUser = (user) =>
  apiCallBegan({
    url: '/auth',
    method: 'post',
    data: user,
    onStart: userLogin.type,
    onSuccess: userLogInSuccess.type,
    onError: userLogInFailed.type,
  });

export const registerUser = (user) =>
  apiCallBegan({
    url: '/register',
    method: 'post',
    data: user,
    onStart: userLogin.type,
    onSuccess: registerUserSuccess.type,
    onError: registerUserFailed.type,
  });
