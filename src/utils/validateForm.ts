import type { SignupFormData } from '../types/Forms';

type SignupFormErrors = Partial<Record<keyof SignupFormData, string>>;

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
  } else if (formData.password.length < 8) {
    newErrors.password = 'Password must be at least 8 characters.';
  }

  return newErrors;
};
