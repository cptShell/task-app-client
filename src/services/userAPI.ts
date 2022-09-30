import { CreateUserDTO, LoginUserDTO, User } from '../types/user';
import axios from 'axios';

export class UserApi {
  #apiPrefix: string;

  constructor(apiPrefix: string) {
    this.#apiPrefix = apiPrefix;
  }

  async createUser(payload: CreateUserDTO): Promise<User | undefined> {
    const url = `${this.#apiPrefix}/users/`;

    try {
      const res = await axios.post<User>(url, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      localStorage.setItem('task-app-user-token', res.data.token);

      return res.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
      } else {
        console.log('error: ' + error);
      }
    }
  }

  async loginUser(payload: LoginUserDTO): Promise<User> {
    const url = `${this.#apiPrefix}/users/login`;

    const res = await axios({ method: 'post', url, data: payload });

    return res.data;
  }

  async deleteUser(): Promise<any> {
    const url = `${this.#apiPrefix}/users/me`;
    const token = localStorage.getItem('task-app-user-token');
    const headers = { Authorization: `Bearer ${token}` };

    if (token) {
      const res = await axios({ method: 'delete', url, headers });
      localStorage.clear();
      return res.data;
    }
  }
}
