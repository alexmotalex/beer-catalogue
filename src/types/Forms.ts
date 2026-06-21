export type AuthCredentials = {
  email: string;
  password: string;
};

export type SignupFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: boolean;
  terms: boolean;
};

export type EditUserFormData = {
  firstName: string;
  lastName: string;
};

export type ForgotPasswordFormData = {
  email: string;
};

export type NewPasswordFormData = {
  password: string;
  confirmPassword: string;
  isSame: string;
};

export type NewPasswordServerData = {
  password: string;
  token: string;
};

export type ServerErrors = {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  general?: string;
  resetToken?: string;
};

export type SignupFormErrors = Partial<Record<keyof SignupFormData, string>>;
export type SignInFormErrors = Partial<Record<keyof AuthCredentials, string>>;
export type EditUserFormErrors = Partial<
  Record<keyof EditUserFormData, string>
>;
export type ForgotPasswordFormErrors = Partial<
  Record<keyof ForgotPasswordFormData, string>
>;
export type NewPasswordFormErrors = Partial<
  Record<keyof NewPasswordFormData, string>
>;
export type NewPasswordServerErrors = Partial<
  Record<keyof NewPasswordServerData, string>
>;
