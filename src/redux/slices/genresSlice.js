import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../middleware/api';
import getFromCache from '../../utils/getFromCache';

const initialState = {
  requestError: false,
  list: [],
  lastFetch: null,
};

const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {
    // Load Genres
    genresReceived: (state, action) => {
      state.list = action.payload.data;
      state.lastFetch = Date.now();
    },
    genresRequestFailed: (state, action) => {
      state.requestError =
        'Cannot process your request at this time. Please try again later.';
    },
  },
});

export const { genresReceived, genresRequestFailed } = genresSlice.actions;

export default genresSlice.reducer;

// LOAD ALL GENRES & CACHE
export const loadGenres = () => (dispatch, getState) => {
  const { lastFetch } = getState().genres;
  if (getFromCache(lastFetch)) return;

  return dispatch(
    apiCallBegan({
      url: '/genres',
      method: 'get',
      data: null,
      onSuccess: genresReceived.type,
      onError: genresRequestFailed.type,
    })
  );
};
