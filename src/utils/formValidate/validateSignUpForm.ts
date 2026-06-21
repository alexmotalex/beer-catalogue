import type { SignupFormData, SignupFormErrors } from '../../types/Forms';

export const PASSWORD_REGEX = /^(?=.*\d).{8,}$/;

export const validateSignUpForm = (formData: SignupFormData) => {
  const newErrors: SignupFormErrors = {};

  if (!formData.firstName.trim()) {
    newErrors.firstName = 'First name is required.';
  }

  if (!formData.lastName.trim()) {
    newErrors.lastName = 'Last name is required.';
  }

  if (!formData.email.trim()) {
    newErrors.email = 'Email is required.';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = 'Please enter a valid email address.';
  }

  if (!formData.password.trim()) {
    newErrors.password = 'Password is required.';
  }

  if (!formData.age) {
    newErrors.age = 'You must confirm your age.';
  }

  if (!formData.terms) {
    newErrors.terms = 'You must accept the terms.';
  }

  return newErrors;
};
