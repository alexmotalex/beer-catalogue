import type { EditUserFormData, EditUserFormErrors } from '../../types/Forms';

export const validateEditUserForm = (formData: EditUserFormData) => {
  const newErrors: EditUserFormErrors = {};

  if (!formData.firstName.trim()) {
    newErrors.firstName = 'First name is required.';
  }

  if (!formData.lastName.trim()) {
    newErrors.lastName = 'Last name is required.';
  }

  return newErrors;
};
