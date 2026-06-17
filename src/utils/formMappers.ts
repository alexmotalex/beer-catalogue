import type { EditUserFormData, SignupFormData } from '../types/Forms';
import type { EditUserData, RegisterUserData } from '../types/User';

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

export const mapToEditUserData = (formData: EditUserFormData): EditUserData => {
  return {
    first_name: formData.firstName,
    last_name: formData.lastName,
  };
};
