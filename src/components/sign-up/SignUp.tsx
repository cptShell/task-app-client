import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { CreateUserDTO as FormValues } from '../../common/types/types';
import { createUser } from '../../validation-schemas/validation-schemas';

export const SignUp: FC = () => {
  const { register, handleSubmit, formState } = useForm<FormValues>({
    resolver: joiResolver(createUser),
  });

  const { errors } = formState;
  console.log(errors);

  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" {...register('name')} />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input type="text" {...register('email')} />
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <input type="text" {...register('age')} />
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
