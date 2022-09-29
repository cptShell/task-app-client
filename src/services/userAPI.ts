import { CreateUserDTO, LoginUserDTO, User } from '../types/user';

export class UserApi {
  #apiPrefix: string;

  constructor(apiPrefix: string) {
    this.#apiPrefix = apiPrefix;
  }

  async createUser(payload: CreateUserDTO): Promise<User> {
    const path = `${this.#apiPrefix}/users/`;

    const response = await fetch(path, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });

    const user: User = await response.json();
    return user;
  }

  async loginUser(payload: LoginUserDTO): Promise<User> {
    const path = `${this.#apiPrefix}/users/login`;

    const response = await fetch(path, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json' },
    });

    const user: User = await response.json();
    return user;
  }
}
