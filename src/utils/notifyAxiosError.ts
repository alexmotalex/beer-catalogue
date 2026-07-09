import type { AxiosError } from 'axios';
import { notifyError } from './notify';

export const notifyAxiosError = (
  error: unknown,
  fallback = 'Something went wrong',
) => {
  const axiosError = error as AxiosError;
  const data = axiosError?.response?.data as
    | Record<string, unknown>
    | undefined;
  const detail =
    data && typeof data === 'object' && 'detail' in data
      ? (data.detail as string | undefined)
      : undefined;

  if (detail) {
    notifyError(detail);
    return;
  }

  notifyError(fallback);
};
