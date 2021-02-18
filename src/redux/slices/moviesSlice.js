import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../middleware/api';
import getFromCache from '../../utils/getFromCache';
// import { toast } from 'react-toastify';

const initialState = {
  loading: false,
  loadingError: false,
  list: [],
  lastFetch: null,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    moviesRequested: (state, action) => {
      state.loading = true;
    },
    moviesRequestFailed: (state, action) => {
      state.loading = false;
      state.loadingError =
        'Cannot process your request at this time. Please try again later.';
    },
    moviesReceived: (state, action) => {
      state.loading = false;
      state.list = action.payload.data;
      state.lastFetch = Date.now();
    },
    movieAdded: (state, action) => {
      state.list.push(action.payload.data);
      // toast.success('Movie added!');
    },
    movieDeleted: (state, action) => {
      state.list.splice(action.payload, 1);
      // toast.success('Movie Deleted!');
    },
    movieUpdated: (state, action) => {
      const { index, data } = action.payload;
      state.list[index].name = data.name;
      state.list[index].email = data.email;
      state.list[index].website = data.website;
      // toast.success('Movie updated!');
    },
    crudRequestFailed: (state, action) => {
      state.list = action.reset;
      // toast.error('Could not complete the operation.');
    },
  },
});

export const {
  moviesRequested,
  moviesRequestFailed,
  moviesReceived,
  movieAdded,
  movieUpdated,
  movieDeleted,
  crudRequestFailed,
} = moviesSlice.actions;

export default moviesSlice.reducer;

// LOAD ALL MOVIES & CACHE
export const loadMovies = () => (dispatch, getState) => {
  const { lastFetch } = getState().movies;
  if (getFromCache(lastFetch)) return;

  return dispatch(
    apiCallBegan({
      url: '/movies',
      method: 'get',
      data: null,
      onStart: moviesRequested.type,
      onSuccess: moviesReceived.type,
      onError: moviesRequestFailed.type,
    })
  );
};

// ADD A MOVIE
// Must be directly sent to API to get a valid ID
export const addMovie = (data) =>
  apiCallBegan({
    url: '/movies',
    method: 'post',
    data: data,
    onSuccess: movieAdded.type,
  });

// UPDATE A MOVIE (optimistic update)
export const updateMovie = (id, data) => (dispatch, getState) => {
  const movies = getState().movies.list;
  const index = movies.findIndex((movie) => movie.id === id);
  dispatch(movieUpdated({ index, data }));

  return dispatch(
    apiCallBegan({
      url: '/movies/' + id,
      method: 'put',
      data: data,
      initialState: movies,
      onError: crudRequestFailed.type,
    })
  );
};

// DELETE A MOVIE (optimistic delete)
export const deleteMovie = (id) => (dispatch, getState) => {
  const movies = getState().movies.list;
  const index = movies.findIndex((movie) => movie.movie_id === id);
  dispatch(movieDeleted(index));

  return dispatch(
    apiCallBegan({
      url: '/movies/' + id,
      method: 'delete',
      initialState: movies,
      onError: crudRequestFailed.type,
    })
  );
};
