import type { AuthCredentials } from './User';

export type SignupFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: boolean;
  terms: boolean;
};

export type ServerErrors = {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  general?: string;
};

export type SignupFormErrors = Partial<Record<keyof SignupFormData, string>>;
export type SignInFormErrors = Partial<Record<keyof AuthCredentials, string>>;
