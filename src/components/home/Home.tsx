import { FC } from 'react';

export const Home: FC = () => {
  const getUser = async () => {
    const user = JSON.stringify({
      password: 'newmail2',
      email: 'newmail2@gmail.com',
    });
    const res = await fetch('http://localhost:3000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: user,
    });
    const data = await res.json();
    console.log(data);
  };

  return (
    <>
      <h2>Home</h2>
      <button onClick={getUser}>check console!</button>
    </>
  );
};
