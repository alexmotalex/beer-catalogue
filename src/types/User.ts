export type AuthCredentials = {
  email: string;
  password: string;
};

export type RegisterUserData = AuthCredentials & {
  first_name: string;
  last_name: string;
};

export type LoginUserData = AuthCredentials;

export type User = {
  id: number;
  email: string;
  is_active: boolean;
  activation_token: 'string';
};
