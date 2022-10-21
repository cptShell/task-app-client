import { FC } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../common/types/types';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { user as userActions } from '../../store/actions';

type Props = {
  user: User | null;
};

export const Header: FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();

  const handleSignOut = async () => {
    await dispatch(userActions.signOut());
  };

  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {user ? (
            <>
              <li>
                <button onClick={handleSignOut}>signout</button>
              </li>
              <li>
                <Link to="/tasks">tasks</Link>
              </li>
              <li>
                <Link to="/profile">profile</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/signin">signin</Link>
              </li>
              <li>
                <Link to="/signup">signup</Link>
              </li>
            </>
          )}
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
