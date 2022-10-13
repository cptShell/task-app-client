import { FC } from 'react';
import { LoginUserDTO, CreateUserDTO } from '../../common/types/user';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { user as userActions } from '../../store/actions';

export const Home: FC = () => {
  const dispatch = useAppDispatch();
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

  const handleCreate = async () => {
    dispatch(userActions.signUp(createPayload));
  };

  const handleLogin = async () => {
    dispatch(userActions.signIn(loginPayload));
  };

  const handleDelete = async () => {
    dispatch(userActions.deleteSelf());
  };

  const handleLogout = async () => {
    dispatch(userActions.signOut());
  };

  return (
    <>
      <h2>Home</h2>
      <div>
        <button onClick={handleCreate}>create user</button>
        <button onClick={handleLogin}>login user</button>
        <button onClick={handleDelete}>delete user</button>
        <button onClick={handleLogout}>logiut user</button>
      </div>
    </>
  );
};
