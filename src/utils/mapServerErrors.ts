import type { ServerErrors } from '../types/Forms';
import { capitalizeFirstLetter } from './capitalizeFirstLetter';

const fieldMap: Record<string, keyof ServerErrors> = {
  email: 'email',
  password: 'password',
  first_name: 'firstName',
  last_name: 'lastName',
  reset_token: 'resetToken',
};

export const mapServerErrors = (details: unknown): ServerErrors => {
  const errors: ServerErrors = {};

  if (!details) {
    return errors;
  }

  // FastAPI validation errors
  if (Array.isArray(details)) {
    details.forEach(error => {
      const field = error.loc?.[1];
      const message = error.msg;

      const mappedField = fieldMap[field];

      if (mappedField) {
        errors[mappedField] = capitalizeFirstLetter(message);
      }
    });

    return errors;
  }

  // Custom backend errors
  if (typeof details === 'object') {
    const detailObject = details as Record<string, unknown>;

    Object.entries(detailObject).forEach(([field, value]) => {
      const errorMessage = Array.isArray(value)
        ? value.join('. ')
        : String(value);

      if (field === 'user_account') {
        errors.email = errorMessage;

        return;
      }

      const mappedField = fieldMap[field];

      if (mappedField) {
        errors[mappedField] = capitalizeFirstLetter(errorMessage);
      }
    });
  }

  return errors;
};
