import { configureStore } from '@reduxjs/toolkit';
import { userApi } from '../services/services';
import { rootRducer } from './root-reducer';

export const extraArgument = {
  userApi,
};

export const store = configureStore({
  reducer: rootRducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: { extraArgument },
    });
  },
});
