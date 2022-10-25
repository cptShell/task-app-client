import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ApiResponse,
  AsyncThunkConfig,
  CreateUserDTO,
  LoginUserDTO,
  User,
} from '../../common/types/types';
import { ActionType } from './common';

export const signIn = createAsyncThunk<
  ApiResponse<User | null>,
  LoginUserDTO,
  AsyncThunkConfig
>(ActionType.SIGN_IN, async (payload, { extra }) => {
  const { userApi } = extra;
  const response = await userApi.loginUser(payload);

  return response;
});

export const getAuthUser = createAsyncThunk<
  ApiResponse<User | null>,
  void,
  AsyncThunkConfig
>(ActionType.GET_AUTH_USER, async (_payload, { extra }) => {
  const { userApi } = extra;

  const response = await userApi.getAuthUser();

  return response;
});

export const signUp = createAsyncThunk<
  ApiResponse<User | null>,
  CreateUserDTO,
  AsyncThunkConfig
>(ActionType.SIGN_UP, async (payload, { extra }) => {
  const { userApi } = extra;
  const response = await userApi.createUser(payload);

  return response;
});

export const signOut = createAsyncThunk<void, void, AsyncThunkConfig>(
  ActionType.SIGN_OUT,
  async (_payload, { extra }) => {
    const { userApi } = extra;

    const response = await userApi.logoutUser();
  }
);

export const deleteSelf = createAsyncThunk<void, void, AsyncThunkConfig>(
  ActionType.DELETE,
  async (_payload, { extra }) => {
    const { userApi } = extra;

    await userApi.deleteUser();
  }
);

export const updateName = createAsyncThunk<
  ApiResponse<User | null>,
  string,
  AsyncThunkConfig
>(ActionType.UPDATE_NAME, async (payload, { extra }) => {
  const { userApi } = extra;
  const response = await userApi.updateUser({ name: payload });

  return response;
});
