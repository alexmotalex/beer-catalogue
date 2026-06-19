import type {
  ForgotPasswordFormData,
  ForgotPasswordFormErrors,
} from '../../types/Forms';

export const validateForgotPasswordForm = (
  formData: ForgotPasswordFormData,
) => {
  const newErrors: ForgotPasswordFormErrors = {};

  if (!formData.email.trim()) {
    newErrors.email = 'Email is required.';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = 'Please enter a valid email address.';
  }

  return newErrors;
};
