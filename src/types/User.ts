export type User = {
  id: number;
  email: string;
  is_active: boolean;
  activation_token: 'string';
};

export type RegisterUserData = {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
};

export type LoginUserData = {
  email: string;
  password: string;
};
