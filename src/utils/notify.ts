import { toast, Slide } from 'react-toastify';

export const notifyError = (message: string) =>
  toast.error(message, {
    position: 'top-right',
    theme: 'colored',
    transition: Slide,
  });

export const notifySuccess = (message: string) =>
  toast.success(message, {
    position: 'top-right',
    theme: 'colored',
    transition: Slide,
  });
