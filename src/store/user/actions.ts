import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkConfig } from '../../common/app/async-thunk-config';
import { CreateUserDTO, LoginUserDTO, User } from '../../common/types/types';
import { userApi } from '../../services/services';
import { ActionType } from './common';

export const signIn = createAsyncThunk<
  User | string,
  LoginUserDTO,
  AsyncThunkConfig
>(ActionType.SIGN_IN, async (payload, { extra }) => {
  const { data, message } = await userApi.loginUser(payload);

  return data || message;
});

export const signUp = createAsyncThunk<
  User | string,
  CreateUserDTO,
  AsyncThunkConfig
>(ActionType.SIGN_UP, async (payload, { extra }) => {
  const { data, message } = await userApi.createUser(payload);

  return data || message;
});

export const signOut = createAsyncThunk<void, void, AsyncThunkConfig>(
  ActionType.SIGN_OUT,
  async (_payload, { extra }) => {
    await userApi.logoutUser();
  }
);

export const deleteSelf = createAsyncThunk<void, void, AsyncThunkConfig>(
  ActionType.DELETE,
  async (_payload, { extra }) => {
    await userApi.deleteUser();
  }
);
