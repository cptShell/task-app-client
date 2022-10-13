import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';

export const Header: FC = () => {
  const user = useAppSelector((state) => state.user.user);

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/signin">signin</Link>
          </li>
          <li>
            <Link to="/signup">signup</Link>
          </li>
          <li>
            <Link to="/tasks">tasks</Link>
          </li>
          <li>
            <Link to="/profile">profile</Link>
          </li>
        </ul>
      </nav>
      {user && (
        <div>
          <span>{user.name}</span>
        </div>
      )}
    </div>
  );
};
