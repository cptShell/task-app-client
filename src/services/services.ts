import { Storage } from './storage';
import { UserApi } from './userAPI';

export const storage = new Storage({
  storage: localStorage,
});

export const userApi = new UserApi('http://localhost:3000');
