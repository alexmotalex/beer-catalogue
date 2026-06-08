import type { SignupFormData } from '../types/Forms';
import type { AuthCredentials } from '../types/User';

export const emptySignUpForm: SignupFormData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  age: false,
  terms: false,
};

export const emptySignInForm: AuthCredentials = {
  email: '',
  password: '',
};
