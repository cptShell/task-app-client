import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  ApiResponse,
  AsyncThunkConfig,
  CreateUserDTO,
  LoginUserDTO,
  User,
} from '../../common/types/types';
import { userApi } from '../../services/services';
import { ActionType } from './common';

export const signIn = createAsyncThunk<
  ApiResponse<User | null>,
  LoginUserDTO,
  AsyncThunkConfig
>(ActionType.SIGN_IN, async (payload, { extra }) => {
  const { data, message } = await userApi.loginUser(payload);
  if (data) {
    return {
      data: { token: data.token, ...data.user },
      message,
    };
  }

  console.log({ data, message });

  return { data, message };
});

export const signUp = createAsyncThunk<
  ApiResponse<User | null>,
  CreateUserDTO,
  AsyncThunkConfig
>(ActionType.SIGN_UP, async (payload) => {
  const { data, message } = await userApi.createUser(payload);
  if (data) {
    return {
      data,
      message,
    };
  }

  console.log({ data, message });

  return { data, message };
});

export const signOut = createAsyncThunk<void, void, AsyncThunkConfig>(
  ActionType.SIGN_OUT,
  async (_payload, { extra }) => {
    const response = await userApi.logoutUser();
    console.log(response);
  }
);

export const deleteSelf = createAsyncThunk<void, void, AsyncThunkConfig>(
  ActionType.DELETE,
  async (_payload, { extra }) => {
    const response = await userApi.deleteUser();
    console.log(response);
  }
);
