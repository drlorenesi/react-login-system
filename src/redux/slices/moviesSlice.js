import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../middleware/api';
import getFromCache from '../../utils/getFromCache';
import { toast } from 'react-toastify';

const initialState = {
  requestError: null,
  list: [],
  lastFetch: null,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    // Load Movies
    moviesReceived: (state, action) => {
      state.list = action.payload.data;
      state.lastFetch = Date.now();
    },
    moviesRequestFailed: (state, action) => {
      state.requestError =
        'Cannot process your request at this time. Please try again later.';
    },
    // Add a Movie
    movieAdded: (state, action) => {
      state.list.push(action.payload.data);
      toast.success('Movie added!', {
        autoClose: 2000,
      });
    },
    movieAddedFailed: (state, action) => {
      toast.error('There was an error processing your request.', {
        autoClose: 2000,
      });
    },
    // Update a Movie
    movieUpdated: (state, action) => {
      const { index, data } = action.payload;
      state.list[index].title = data.title;
      state.list[index].genre_id = data.genreId;
      state.list[index].number_in_stock = data.numberInStock;
      state.list[index].daily_rental_rate = data.dailyRentalRate;
    },
    movieUpdatedFailed: (state, action) => {
      state.list = action.reset;
      toast.error('There was an error processing your request.', {
        autoClose: 2000,
      });
    },
    // Delete a Movie
    movieDeleted: (state, action) => {
      state.list.splice(action.payload, 1);
    },
    movieDeletedSuccess: (state, action) => {
      toast.success('Movie deleted!', {
        autoClose: 2000,
      });
    },
    movieDeletedFailed: (state, action) => {
      toast.error('There was an error processing your request.', {
        autoClose: 2000,
      });
    },
  },
});

export const {
  moviesReceived,
  moviesRequestFailed,
  movieAdded,
  movieAddedFailed,
  movieUpdated,
  movieUpdatedFailed,
  movieDeleted,
  movieDeletedSuccess,
  movieDeletedFailed,
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
    onError: movieAddedFailed.type,
  });

// UPDATE A MOVIE (optimistic update)
export const updateMovie = (id, data) => (dispatch, getState) => {
  const movies = getState().movies.list;
  const index = movies.findIndex((movie) => movie.movie_id === id);
  dispatch(movieUpdated({ index, data }));

  return dispatch(
    apiCallBegan({
      url: '/movies/' + id,
      method: 'put',
      data: data,
      initialState: movies,
      onError: movieUpdatedFailed.type,
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
      onSuccess: movieDeletedSuccess.type,
      onError: movieDeletedFailed.type,
    })
  );
};
