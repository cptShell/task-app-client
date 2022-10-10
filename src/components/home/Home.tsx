import { FC } from 'react';
import { LoginUserDTO, CreateUserDTO } from '../../common/types/user';
import { UserApi } from '../../services/userAPI';

export const Home: FC = () => {
  const loginPayload: LoginUserDTO = {
    password: 'newmail2',
    email: 'repozheka@gmail.com',
  };
  const createPayload: CreateUserDTO = {
    name: 'newuserTWO',
    email: 'repozheka@gmail.com',
    age: 26,
    password: 'newmail2',
  };
  const userApi = new UserApi('http://localhost:3000');

  const handleCreate = async () => {
    const user = await userApi.createUser(createPayload);
    console.log(user);
  };

  const handleLogin = async () => {
    const user = await userApi.loginUser(loginPayload);
    console.log(user);
  };

  const handleDelete = async () => {
    const result = await userApi.deleteUser();
    console.log(result);
  };

  return (
    <>
      <h2>Home</h2>
      <div></div>
      <div>
        <button onClick={handleCreate}>create user</button>
        <button onClick={handleLogin}>login user</button>
        <button onClick={handleDelete}>delete user</button>
      </div>
    </>
  );
};
