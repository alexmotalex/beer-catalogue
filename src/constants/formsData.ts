import type {
  AuthCredentials,
  EditUserFormData,
  ForgotPasswordFormData,
  NewPasswordFormData,
  SignupFormData,
} from '../types/Forms';

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

export const emptyEditUserForm: EditUserFormData = {
  firstName: '',
  lastName: '',
};

export const emptyForgotPasswordForm: ForgotPasswordFormData = {
  email: '',
};

export const emptyNewPasswordForm: NewPasswordFormData = {
  password: '',
  confirmPassword: '',
  isSame: '',
};
