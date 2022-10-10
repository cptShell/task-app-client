import axios, { Axios, AxiosError } from 'axios';
import { UserApiPath } from '../common/enums/enums';
import {
  ApiResponse,
  CreateUserDTO,
  LoginUserDTO,
  User,
} from '../common/types/types';

export class UserApi {
  #axiosInstance: Axios;

  constructor(apiPrefix: string) {
    this.#axiosInstance = axios.create({
      baseURL: apiPrefix,
    });
  }

  async createUser(payload: CreateUserDTO): Promise<ApiResponse<User>> {
    try {
      const { data } = await this.#axiosInstance.post<User>(
        UserApiPath.USER,
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );
      localStorage.setItem('task-app-user-token', data.token);

      return { status: 'ok', data };
    } catch (error) {
      let message: string;

      if (axios.isAxiosError(error)) {
        message = (error.response?.data as AxiosError).message;
      } else {
        message = error as string;
      }

      return { status: 'failed', message };
    }
  }

  async loginUser(payload: LoginUserDTO): Promise<ApiResponse<User>> {
    try {
      const { data } = await this.#axiosInstance.post<User>(
        UserApiPath.LOGIN,
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );
      localStorage.setItem('task-app-user-token', data.token);

      return { status: 'ok', data };
    } catch (error) {
      let message: string;

      if (axios.isAxiosError(error)) {
        message = (error.response?.data as AxiosError).message;
      } else {
        message = error as string;
      }

      return { status: 'failed', message };
    }
  }

  async deleteUser(): Promise<ApiResponse<null>> {
    const token = localStorage.getItem('task-app-user-token');
    const headers = { Authorization: `Bearer ${token}` };

    if (token) {
      await this.#axiosInstance.delete(UserApiPath.PROFILE, { headers });

      localStorage.clear();

      return { status: 'ok', data: null };
    }

    return { status: 'failed', message: 'User not found!' };
  }
}
