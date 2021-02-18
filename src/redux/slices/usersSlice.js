import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from '../middleware/api';
import getFromCache from '../../utils/getFromCache';

const initialState = {
  loading: false,
  loadingError: false,
  list: [],
  lastFetch: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    usersRequested: (state, action) => {
      state.loading = true;
    },
    usersReceived: (state, action) => {
      state.loading = false;
      state.list = action.payload.data;
      state.lastFetch = Date.now();
    },
    usersRequestFailed: (state, action) => {
      state.loading = false;
      state.loadingError =
        'Cannot load users at this time. Please try again later.';
    },
    userAdded: (state, action) => {
      state.list.push(action.payload.data);
    },
    userDeleted: (state, action) => {
      state.list.splice(action.payload, 1);
    },
    userUpdated: (state, action) => {
      const { index, data } = action.payload;
      state.list[index].name = data.name;
      state.list[index].email = data.email;
      state.list[index].website = data.website;
    },
    crudRequestFailed: (state, action) => {
      state.list = action.reset;
    },
  },
});

export const {
  usersRequested,
  usersReceived,
  usersRequestFailed,
  userAdded,
  userUpdated,
  userDeleted,
  crudRequestFailed,
} = usersSlice.actions;

export default usersSlice.reducer;

// LOAD ALL USERS & CACHE
export const loadUsers = () => (dispatch, getState) => {
  const { lastFetch } = getState().users;
  if (getFromCache(lastFetch)) return;

  return dispatch(
    apiCallBegan({
      url: '/users',
      method: 'get',
      data: null,
      onStart: usersRequested.type,
      onSuccess: usersReceived.type,
      onError: usersRequestFailed.type,
    })
  );
};

// ADD A USER
// Must be directly sent to API to get a valid ID
export const addUser = (data) =>
  apiCallBegan({
    url: '/users',
    method: 'post',
    data: data,
    onSuccess: userAdded.type,
  });

// UPDATE A USER (optimistic update)
export const updateUser = (id, data) => (dispatch, getState) => {
  const users = getState().users.list;
  const index = users.findIndex((user) => user.id === id);
  dispatch(userUpdated({ index, data }));

  return dispatch(
    apiCallBegan({
      url: '/users/' + id,
      method: 'put',
      data: data,
      initialState: users,
      onError: crudRequestFailed.type,
    })
  );
};

// DELETE A USER (optimistic delete)
export const deleteUser = (id) => (dispatch, getState) => {
  const users = getState().users.list;
  const index = users.findIndex((user) => user.id === id);
  dispatch(userDeleted(index));

  return dispatch(
    apiCallBegan({
      url: '/userss/' + id,
      method: 'delete',
      initialState: users,
      onError: crudRequestFailed.type,
    })
  );
};
