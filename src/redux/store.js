import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import api from './middleware/api';

const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), api]
});

export default store;
