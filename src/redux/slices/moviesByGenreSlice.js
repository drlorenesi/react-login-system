import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../middleware/api';
// import getFromCache from '../../utils/getFromCache';

const initialState = {
  loading: false,
  loadingError: false,
  list: [],
  lastFetch: null,
};

const moviesByGenreSlice = createSlice({
  name: 'moviesByGenre',
  initialState,
  reducers: {
    dataRequested: (state, action) => {
      state.loading = true;
    },
    dataReceived: (state, action) => {
      state.loading = false;
      state.list = action.payload.data;
      state.lastFetch = Date.now();
    },
    dataRequestFailed: (state, action) => {
      state.loading = false;
      state.loadingError =
        'Cannot process your request at this time. Please try again later.';
    },
  },
});

export const {
  dataRequested,
  dataReceived,
  dataRequestFailed,
} = moviesByGenreSlice.actions;

export default moviesByGenreSlice.reducer;

// LOAD DATA & CACHE
export const loadData = () => (dispatch, getState) => {
  // const { lastFetch } = getState().moviesByGenre;
  // if (getFromCache(lastFetch)) return;

  return dispatch(
    apiCallBegan({
      url: '/stats/moviesbygenre',
      method: 'get',
      data: null,
      onStart: dataRequested.type,
      onSuccess: dataReceived.type,
      onError: dataRequestFailed.type,
    })
  );
};
