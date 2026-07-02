import type { AuthCredentials } from './Forms';

export type RegisterUserData = AuthCredentials & {
  first_name: string | null;
  last_name: string | null;
};

export type User = {
  email: string;
  first_name: string;
  last_name: string;
};

export type EditUserData = {
  first_name: string | null;
  last_name: string | null;
};
