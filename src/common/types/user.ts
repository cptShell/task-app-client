export type CreateUserDTO = {
  name: string;
  email: string;
  age: number;
  password: string;
};

export type LoginUserDTO = {
  email: string;
  password: string;
};

export type UserDto = {
  user: {
    name: string;
    email: string;
    age: number;
    _id: string;
  };
  token: string;
};

export type User = {
  name: string;
  email: string;
  age: number;
  _id: string;
  token: string;
};
