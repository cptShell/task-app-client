import { createReducer } from '@reduxjs/toolkit';
import { User } from '../../common/types/types';
import {
  deleteSelf,
  getAuthUser,
  signIn,
  signOut,
  signUp,
  updateName,
} from './actions';

type State = {
  user: User | null;
};

const initialState: State = {
  user: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(getAuthUser.fulfilled, (state, action) => {
    if (action.payload.data) state.user = action.payload.data;
  });
  builder.addCase(signIn.fulfilled, (state, action) => {
    if (action.payload.data) state.user = action.payload.data;
  });
  builder.addCase(signUp.fulfilled, (state, action) => {
    if (action.payload.data) state.user = action.payload.data;
  });
  builder.addCase(updateName.fulfilled, (state, action) => {
    console.log(action.payload);
    if (action.payload.data) state.user = action.payload.data;
  });
  builder.addCase(signOut.fulfilled, (state) => {
    state.user = null;
  });
  builder.addCase(deleteSelf.fulfilled, (state) => {
    state.user = null;
  });
});
