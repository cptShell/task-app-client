import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import {
  SignIn,
  SignUp,
  Tasks,
  Home,
  Profile,
  Header,
  PrivateRoute,
  AuthRoute,
} from './components/components';
import './App.css';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { user as userActions } from './store/actions';
import { storage } from './services/services';
import { StorageKey } from './common/enums/storage-key';

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    const auth = async () => {
      const token = storage.getItem(StorageKey.TOKEN);

      if (!user || token) dispatch(userActions.getAuthUser());
    };
    auth();
  }, []);

  return (
    <div>
      <Header user={user} />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          {user ? (
            <Route element={<PrivateRoute />}>
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/profile" element={<Profile user={user} />} />
            </Route>
          ) : (
            <Route element={<AuthRoute />}>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
            </Route>
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
