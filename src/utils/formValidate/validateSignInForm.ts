import type { AuthCredentials, SignInFormErrors } from '../../types/Forms';

export const validateSignInForm = (formData: AuthCredentials) => {
  const newErrors: SignInFormErrors = {};

  if (!formData.email.trim()) {
    newErrors.email = 'Email is required.';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = 'Please enter a valid email address.';
  }

  if (!formData.password) {
    newErrors.password = 'Password is required.';
  }

  return newErrors;
};
