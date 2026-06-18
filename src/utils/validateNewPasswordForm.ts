import type {
  NewPasswordFormData,
  NewPasswordFormErrors,
} from '../types/Forms';

export const validateNewPasswordForm = (formData: NewPasswordFormData) => {
  const newErrors: NewPasswordFormErrors = {};

  if (!formData.password) {
    newErrors.password = 'New password is required.';
  }

  if (!formData.confirmPassword) {
    newErrors.confirmPassword = 'Confirm password is required.';
  }

  if (formData.password !== formData.confirmPassword) {
    newErrors.isSame = 'Passwords are not equal';
  }

  return newErrors;
};
