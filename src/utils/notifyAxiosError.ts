import type { AxiosError } from 'axios';
import { notifyError } from './notify';

export const notifyAxiosError = (
  error: unknown,
  fallback = 'Something went wrong',
) => {
  const axiosError = error as AxiosError;
  const status = axiosError?.response?.status;

  if (status) {
    notifyError(`Request failed with status code ${status}`);
    return;
  }

  notifyError(fallback);
};
