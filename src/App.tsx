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

function App() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    const auth = async () => {
      if (!user) dispatch(userActions.getAuthUser());
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
          <Route element={<PrivateRoute />}>
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
