import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../middleware/api';
import getFromCache from '../../utils/getFromCache';

const initialState = {
  loading: false,
  loadingError: false,
  list: [],
  lastFetch: null,
};

const genresSlice = createSlice({
  name: 'genres',
  initialState,
  reducers: {
    genresRequested: (state, action) => {
      state.loading = true;
    },
    genresReceived: (state, action) => {
      state.loading = false;
      state.list = action.payload.data;
      state.lastFetch = Date.now();
    },
    genresRequestFailed: (state, action) => {
      state.loading = false;
      state.loadingError =
        'Cannot process your request at this time. Please try again later.';
    },
  },
});

export const {
  genresRequested,
  genresReceived,
  genresRequestFailed,
} = genresSlice.actions;

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
      onStart: genresRequested.type,
      onSuccess: genresReceived.type,
      onError: genresRequestFailed.type,
    })
  );
};
