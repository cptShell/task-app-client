import { Routes, Route } from 'react-router-dom';
import {
  SignIn,
  SignUp,
  Tasks,
  Home,
  Profile,
  Header,
  PrivateRoute,
} from './components/components';
import './App.css';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { useEffect } from 'react';
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
      <Header />
      <div>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          {user && (
            <Route element={<PrivateRoute />}>
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/profile" element={<Profile user={user} />} />
            </Route>
          )}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
