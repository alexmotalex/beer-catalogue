import type { SignupFormData } from '../types/Forms';
import type { RegisterUserData } from '../types/User';

export const mapToRegisterData = (
  formData: SignupFormData,
): RegisterUserData => {
  return {
    email: formData.email,
    password: formData.password,
    first_name: formData.firstName,
    last_name: formData.lastName,
  };
};
