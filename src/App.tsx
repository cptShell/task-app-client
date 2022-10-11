import { Routes, Route, Link } from 'react-router-dom';
import {
  SignIn,
  SignUp,
  Tasks,
  Home,
  Profile,
  Header,
} from './components/components';
import './App.css';

function App() {
  return (
    <div>
      <Header />
      <div>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
