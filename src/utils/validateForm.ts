import type { SignupFormData } from '../types/Forms';

type SignupFormErrors = Partial<Record<keyof SignupFormData, string>>;

const PASSWORD_REGEX = /^(?=.*\d).{8,}$/;

export const validateForm = (formData: SignupFormData) => {
  const newErrors: SignupFormErrors = {};

  if (!formData.firstName.trim()) {
    newErrors.firstName = 'Username is required.';
  }

  if (!formData.lastName.trim()) {
    newErrors.lastName = 'Username is required.';
  }

  if (!formData.email.trim()) {
    newErrors.email = 'Email is required.';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = 'Please enter a valid email address.';
  }

  if (!formData.password) {
    newErrors.password = 'Password is required.';
  } else if (!PASSWORD_REGEX.test(formData.password)) {
    newErrors.password = 'Password requirements not met.';
  }

  return newErrors;
};
