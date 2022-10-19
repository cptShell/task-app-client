import { Storage } from './storage';
import { TaskApi } from './taskAPI';
import { UserApi } from './userAPI';

export const storage = new Storage({
  storage: localStorage,
});

export const testApi = new UserApi('http://localhost:3000');
export const userApi = new UserApi('http://localhost:3000');
export const taskApi = new TaskApi('http://localhost:3000');
