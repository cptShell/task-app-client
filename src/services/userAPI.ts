import { CreateUserDTO, LoginUserDTO, User } from '../types/user';
import axios, { Axios, AxiosError } from 'axios';

type CreateUserError = {
  message: string;
  name: string;
};

type ApiResponse<T> = {
  status: string;
  message?: string;
  data?: T;
};

export class UserApi {
  #axiosInstance: Axios;

  constructor(apiPrefix: string) {
    this.#axiosInstance = axios.create({
      baseURL: apiPrefix,
    });
  }

  async createUser(payload: CreateUserDTO): Promise<ApiResponse<User>> {
    const url = 'users';

    try {
      const { data } = await this.#axiosInstance.post<User>(url, payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      localStorage.setItem('task-app-user-token', data.token);

      return { status: 'ok', data };
    } catch (error) {
      let message: string;
      if (axios.isAxiosError(error)) {
        message = (error.response?.data as CreateUserError).message;
      } else {
        message = error as string;
      }

      return { status: 'failed', message };
    }
  }

  async loginUser(payload: LoginUserDTO): Promise<ApiResponse<User>> {
    const url = 'users/login';

    try {
      const { data } = await this.#axiosInstance.post<User>(url, payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      localStorage.setItem('task-app-user-token', data.token);

      return { status: 'ok', data };
    } catch (error) {
      let message: string;

      if (axios.isAxiosError(error)) {
        message = (error.response?.data as CreateUserError).message;
      } else {
        message = error as string;
      }

      return { status: 'failed', message };
    }
  }

  async deleteUser(): Promise<ApiResponse<null>> {
    const url = 'users/me';
    const token = localStorage.getItem('task-app-user-token');
    const headers = { Authorization: `Bearer ${token}` };

    if (token) {
      const res = await this.#axiosInstance.delete(url, { headers });

      localStorage.clear();

      return { status: 'ok', data: null };
    }

    return { status: 'failed', message: 'User not found!' };
  }
}
