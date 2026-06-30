import type {
  NewPasswordFormData,
  NewPasswordFormErrors,
} from '../../types/Forms';

export const validateNewPasswordForm = (formData: NewPasswordFormData) => {
  const newErrors: NewPasswordFormErrors = {};

  if (!formData.password.trim()) {
    newErrors.password = 'New password is required.';
  }

  if (!formData.confirmPassword.trim()) {
    newErrors.confirmPassword = 'Confirm password is required.';
  }

  if (
    formData.confirmPassword.trim() &&
    formData.password.trim() !== formData.confirmPassword.trim()
  ) {
    newErrors.isSame = 'Passwords are missmatching';
  }

  return newErrors;
};
