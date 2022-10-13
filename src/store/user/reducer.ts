import { createReducer } from '@reduxjs/toolkit';
import { User } from '../../common/types/types';
import { deleteSelf, signIn, signOut, signUp } from './actions';

type State = {
  user: User | null;
};

const initialState: State = {
  user: null,
};

export const reducer = createReducer(initialState, (builder) => {
  builder.addCase(signIn.fulfilled, (state, action) => {
    if (action.payload.data) {
      state.user = action.payload.data;
    }
  });
  builder.addCase(signUp.fulfilled, (state, action) => {
    if (action.payload.data) {
      state.user = action.payload.data;
    }
  });
  builder.addCase(signOut.fulfilled, (state, action) => {
    state.user = null;
  });
  builder.addCase(deleteSelf.fulfilled, (state, action) => {
    state.user = null;
  });
});
