import { FC } from 'react';
import { User } from '../../common/types/types';

type Props = {
  user: User;
};

export const Profile: FC<Props> = ({ user }) => {
  const { name, age, email } = user;

  return (
    <div>
      <h2>Profile</h2>
      <p>{name}</p>
      <p>{email}</p>
      <p>{age} years</p>
    </div>
  );
};
