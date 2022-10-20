import { FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AppRoute } from '../../common/enums/app-route';
import { useAppSelector } from '../../hooks/use-app-selector';

export const PrivateRoute: FC = () => {
  const { user } = useAppSelector((state) => ({
    user: state.user.user,
  }));
  console.log('123123');
  if (!user) {
    console.log('redirect to main page!');
    return <Navigate to={AppRoute.HOME} />;
  }

  return <Outlet />;
};
