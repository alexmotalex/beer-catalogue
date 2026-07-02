import type { SignupFormData, SignupFormErrors } from '../../types/Forms';
import { validateName } from '../validateName';
import { validatePassword } from '../validatePassword';

export const validateSignUpForm = (formData: SignupFormData) => {
  const newErrors: SignupFormErrors = {};

  if (!formData.firstName.trim()) {
    newErrors.firstName = 'First name is required.';
  } else {
    const firstNameError = validateName(formData.firstName, 'First name');
    if (firstNameError) {
      newErrors.firstName = firstNameError;
    }
  }

  if (!formData.lastName.trim()) {
    newErrors.lastName = 'Last name is required.';
  } else {
    const lastNameError = validateName(formData.lastName, 'Last name');
    if (lastNameError) {
      newErrors.lastName = lastNameError;
    }
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
