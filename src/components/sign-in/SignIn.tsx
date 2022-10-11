import { joiResolver } from '@hookform/resolvers/joi';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { LoginUserDTO } from '../../common/types/types';
import { loginUser } from '../../validation-schemas/validation-schemas';

export const SignIn: FC = () => {
  const { register, handleSubmit, formState } = useForm<LoginUserDTO>({
    resolver: joiResolver(loginUser),
  });

  const { errors } = formState;

  console.log(errors);

  const onSubmit = (data: LoginUserDTO) => console.log(data);

  return (
    <>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" {...register('email')} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="text" {...register('password')} />
        </div>
        <button>submit</button>
      </form>
    </>
  );
};
