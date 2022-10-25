import axios, { Axios } from 'axios';
import { StorageKey, UserApiPath } from '../common/enums/enums';
import {
  ApiError,
  ApiResponse,
  CreateUserDTO,
  LoginUserDTO,
  User,
  UserDto,
} from '../common/types/types';
import { storage } from './services';

export class UserApi {
  #axiosInstance: Axios;

  constructor(apiPrefix: string) {
    this.#axiosInstance = axios.create({
      baseURL: apiPrefix,
    });
  }

  async createUser(payload: CreateUserDTO): Promise<ApiResponse<User | null>> {
    try {
      const { data } = await this.#axiosInstance.post<UserDto>(
        UserApiPath.USER,
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );

      storage.setItem(StorageKey.TOKEN, data.token);

      return {
        data: { token: data.token, ...data.user },
        message: 'ok',
      };
    } catch (error) {
      let message: string;

      if (axios.isAxiosError(error)) {
        message = (error.response?.data as ApiError).error;
      } else {
        message = error as string;
      }

      return { data: null, message };
    }
  }

  async updateUser(
    payload: Partial<CreateUserDTO>
  ): Promise<ApiResponse<User | null>> {
    try {
      const token = storage.getItem(StorageKey.TOKEN);

      if (!token) return { data: null, message: 'Unauthorized' };

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      await this.#axiosInstance.patch<UserDto>(UserApiPath.PROFILE, payload, {
        headers,
      });

      const response = await this.getAuthUser();

      return response;
    } catch (error) {
      let message: string;

      if (axios.isAxiosError(error)) {
        message = (error.response?.data as ApiError).error;
      } else {
        message = error as string;
      }

      return { data: null, message };
    }
  }

  async loginUser(payload: LoginUserDTO): Promise<ApiResponse<User | null>> {
    try {
      const { data } = await this.#axiosInstance.post<UserDto>(
        UserApiPath.LOGIN,
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );
      storage.setItem(StorageKey.TOKEN, data.token);

      return {
        data: { token: data.token, ...data.user },
        message: 'ok',
      };
    } catch (error) {
      let message: string;

      if (axios.isAxiosError(error)) {
        message = (error.response?.data as ApiError).error;
      } else {
        message = error as string;
      }

      return { data: null, message };
    }
  }

  async getAuthUser(): Promise<ApiResponse<User | null>> {
    const token = storage.getItem(StorageKey.TOKEN);
    const payload = { token };

    if (!token) return { data: null, message: 'Unauthorized' };

    try {
      const { data } = await this.#axiosInstance.post<UserDto>(
        UserApiPath.USER_FROM_TOKEN,
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );

      return {
        data: { token: data.token, ...data.user },
        message: 'ok',
      };
    } catch (error) {
      let message: string;

      if (axios.isAxiosError(error)) {
        message = (error.response?.data as ApiError).error;
      } else {
        message = error as string;
      }

      return { data: null, message };
    }
  }

  async deleteUser(): Promise<ApiResponse<boolean>> {
    const token = storage.getItem(StorageKey.TOKEN);
    const headers = { Authorization: `Bearer ${token}` };

    if (token) {
      await this.#axiosInstance.delete(UserApiPath.PROFILE, { headers });

      storage.remove(StorageKey.TOKEN);

      return { data: true, message: 'ok' };
    }

    return { data: false, message: 'User not found!' };
  }

  async logoutUser(): Promise<ApiResponse<boolean>> {
    const token = storage.getItem(StorageKey.TOKEN);
    const headers = { Authorization: `Bearer ${token}` };

    if (token) {
      this.#axiosInstance.defaults.headers.common = headers;
      await this.#axiosInstance.post(UserApiPath.LOGOUT);

      storage.remove(StorageKey.TOKEN);

      return { data: true, message: 'ok' };
    }

    return { data: false, message: 'User not found!' };
  }
}
