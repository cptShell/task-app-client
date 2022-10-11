import { FC } from 'react';
import { Link } from 'react-router-dom';

export const Header: FC = () => {
  return (
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
  );
};
