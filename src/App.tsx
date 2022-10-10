import { Routes, Route } from 'react-router-dom';
import { SignIn, SignUp, Tasks, Home, Profile } from './components/components';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<SignIn />} />
      <Route path="/signin" element={<SignUp />} />
      <Route path="/tasks" element={<Tasks />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
