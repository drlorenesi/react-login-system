import { createAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getAuthToken } from '../../services/authService';
import config from '../../config';

export const apiCallBegan = createAction('api/callBegan');
export const apiCallSuccess = createAction('api/callSuccess');
export const apiCallAccessDenied = createAction('api/callAccesDenied');
export const apiCallFailed = createAction('api/callFailed');

axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['x-auth-token'] = getAuthToken();
// Handle unexpected errors
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    toast.error('An unexpected error ocurred.');
    console.log('Logging unexpected error...', error);
  }
  return Promise.reject(error);
});

// BEGIN MIDDLEWARE FUNCTION
const api = ({ dispatch }) => (next) => async (action) => {
  getAuthToken(); // Check if JWT is valid before every call
  // window.location = '/login';
  if (action.type !== apiCallBegan.type) return next(action);

  const {
    url,
    method,
    data,
    onStart,
    onSuccess,
    onError,
    initialState,
  } = action.payload;

  if (onStart) dispatch({ type: onStart });

  next(action);

  try {
    const response = await axios.request({
      baseURL: config.apiEndpoint,
      url,
      method,
      data,
    });
    // General message to indicate a successful API call in Redux DevTools
    dispatch(apiCallSuccess({ data: response.data, status: response.status }));
    // Specific action to dispatch in slice after successful API call
    if (onSuccess)
      dispatch({
        type: onSuccess,
        payload: {
          data: response.data,
          headers: response.headers,
          status: response.status,
        },
      });
  } catch (error) {
    // General error message for debugging in Redux RedTools
    dispatch(apiCallFailed(error.message));
    // Specific action to dispatch in slice after an un successful API call
    if (onError)
      dispatch({ type: onError, payload: error.message, reset: initialState });
  }
};

export default api;
