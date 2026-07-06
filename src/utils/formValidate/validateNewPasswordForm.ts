import type {
  NewPasswordFormData,
  NewPasswordFormErrors,
} from '../../types/Forms';
import { validatePassword } from '../validatePassword';

export const validateNewPasswordForm = (formData: NewPasswordFormData) => {
  const newErrors: NewPasswordFormErrors = {};

  if (!formData.password.trim()) {
    newErrors.password = 'Password is required.';
  } else {
    const passwordError = validatePassword(formData.password);

    if (passwordError) {
      newErrors.password = passwordError;
    }
  }

  if (!formData.confirmPassword.trim()) {
    newErrors.confirmPassword = 'Password is required.';
  } else {
    const passwordError = validatePassword(formData.password);

    if (passwordError) {
      newErrors.confirmPassword = passwordError;
    }
  }

  if (
    formData.confirmPassword.trim() &&
    formData.password.trim() !== formData.confirmPassword.trim()
  ) {
    newErrors.isSame = 'Passwords are missmatching';
  }

  return newErrors;
};
