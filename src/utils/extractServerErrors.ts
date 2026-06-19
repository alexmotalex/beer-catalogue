// utils/extractServerErrors.ts
import { mapServerErrors } from './mapServerErrors';
import type { ServerErrors } from '../types/Forms';

type ServerErrorResponse = {
  response?: { data?: { detail?: unknown; message?: string } };
};

export const extractServerErrors = (
  error: unknown,
  fallbackField: 'email' | 'general' = 'email',
): ServerErrors => {
  const axiosError = error as ServerErrorResponse;
  const details = axiosError.response?.data?.detail;

  if (typeof details === 'string') {
    return { [fallbackField]: details };
  }

  return mapServerErrors(details);
};
