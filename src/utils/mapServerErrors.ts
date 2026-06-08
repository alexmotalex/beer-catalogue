import type { ServerErrors } from '../types/Forms';

export const mapServerErrors = (details: unknown): ServerErrors => {
  if (!Array.isArray(details)) {
    return {};
  }

  const errors: ServerErrors = {};

  details.forEach(error => {
    const field = error.loc?.[1];
    const message = error.msg;

    if (field === 'email') {
      errors.email = message;
    }

    if (field === 'password') {
      errors.password = message;
    }

    if (field === 'first_name') {
      errors.firstName = message;
    }

    if (field === 'last_name') {
      errors.lastName = message;
    }
  });

  return errors;
};
