import type { SignupFormData, SignupFormErrors } from '../../types/Forms';
import { validatePassword } from '../validatePassword';

const NAME_REGEX = /^[a-zA-Zа-яА-ЯіІїЇєЄ'\- ]+$/;

export const validateSignUpForm = (formData: SignupFormData) => {
  const newErrors: SignupFormErrors = {};

  if (!formData.firstName.trim()) {
    newErrors.firstName = 'First name is required.';
  } else if (formData.firstName.trim().length < 2) {
    newErrors.firstName = 'First name must be at least 2 characters.';
  } else if (!NAME_REGEX.test(formData.firstName)) {
    newErrors.firstName =
      'First name can only contain letters, hyphens, and apostrophes.';
  }

  if (!formData.lastName.trim()) {
    newErrors.lastName = 'Last name is required.';
  } else if (formData.lastName.trim().length < 2) {
    newErrors.lastName = 'Last name must be at least 2 characters.';
  } else if (!NAME_REGEX.test(formData.lastName)) {
    newErrors.lastName =
      'Last name can only contain letters, hyphens, and apostrophes.';
  }

  if (!formData.email.trim()) {
    newErrors.email = 'Email is required.';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = 'Please enter a valid email address.';
  }

  if (!formData.password.trim()) {
    newErrors.password = 'Password is required.';
  } else {
    const passwordError = validatePassword(formData.password);

    if (passwordError) {
      newErrors.password = passwordError;
    }
  }

  if (!formData.age) {
    newErrors.age = 'You must confirm your age.';
  }

  if (!formData.terms) {
    newErrors.terms = 'You must accept the terms.';
  }

  return newErrors;
};
