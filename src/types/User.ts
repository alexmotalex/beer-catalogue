export type AuthCredentials = {
  email: string;
  password: string;
};

export type RegisterUserData = AuthCredentials & {
  first_name: string;
  last_name: string;
};

export type User = {
  email: string;
  first_name: string;
  last_name: string;
};

export type EditUserData = {
  first_name: string;
  last_name: string;
};
