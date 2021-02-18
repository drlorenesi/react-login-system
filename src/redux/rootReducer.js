import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from './slices/loginSlice';
import moviesReducer from './slices/moviesSlice';
import genresReducer from './slices/genresSlice';
import usersReducer from './slices/usersSlice';

export default combineReducers({
  login: loginReducer,
  movies: moviesReducer,
  users: usersReducer,
  genres: genresReducer,
});
