import type { EditUserFormData, EditUserFormErrors } from '../../types/Forms';
import { validateName } from '../validateName';

export const validateEditUserForm = (formData: EditUserFormData) => {
  const newErrors: EditUserFormErrors = {};

  if (formData.firstName.trim()) {
    const firstNameError = validateName(formData.firstName, 'First name');

    if (firstNameError) {
      newErrors.firstName = firstNameError;
    }
  }

  if (formData.lastName.trim()) {
    const lastNameError = validateName(formData.lastName, 'Last name');

    if (lastNameError) {
      newErrors.lastName = lastNameError;
    }
  }
  return newErrors;
};
