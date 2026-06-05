import React, { useEffect, useMemo, useState } from 'react';
import { instance } from '../../api/axiosInstance';
import { AuthContext } from './AuthContext';
import type { LoginUserData, RegisterUserData, User } from '../../types/User';
import { client } from '../../utils/axiosClient';

export type AuthContextType = {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  submitError: string;
  setSubmitError: (arg: string) => void;
  login: (data: LoginUserData) => Promise<void>;
  register: (data: RegisterUserData) => Promise<boolean>;
  logout: () => Promise<void>;
};

export type Props = {
  children: React.ReactNode;
};

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [user] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const isAuthenticated = Boolean(user && accessToken);

  const register = async (data: RegisterUserData) => {
    setIsLoading(true);
    setSubmitError('');

    try {
      await client.post('/users/register', data);

      setIsSuccess(true);

      return true;
    } catch (error: unknown) {
      const axiosError = error as {
        response?: { data?: { detail?: unknown; message?: string } };
      };
      // 1. Check for the FastAPI 'detail' array structure
      const details = axiosError.response?.data?.detail;

      let finalMessage = 'An unexpected error occurred';

      if (Array.isArray(details) && details.length > 0) {
        // Take the message from the first error found
        // e.g., "Field 'email' is invalid"
        finalMessage = details[0].msg;
      } else if (typeof details === 'string') {
        // Sometimes 'detail' is just a string
        finalMessage = details;
      } else if (axiosError.response?.data?.message) {
        // Fallback to your original logic
        finalMessage = axiosError.response.data.message;
      }

      setSubmitError(finalMessage);

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: LoginUserData) => {
    const response = await instance.post('/login', data);

    setAccessToken(response.data.access_token);
  };

  const logout = async () => {
    try {
      await instance.post('/logout');
    } finally {
      setAccessToken(null);
    }
  };

  // useEffect(() => {
  //   const refreshSession = async () => {
  //     try {
  //       const response = await instance.post('/refresh');

  //       setUser(response.data.user);
  //       setAccessToken(response.data.accessToken);
  //     } catch {
  //       setUser(null);
  //       setAccessToken(null);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   refreshSession();
  // }, []);

  useEffect(() => {
    const interceptorId = instance.interceptors.request.use(config => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    });

    return () => {
      instance.interceptors.request.eject(interceptorId);
    };
  }, [accessToken]);

  const value = useMemo(
    () => ({
      user,
      accessToken,
      isAuthenticated,
      isLoading,
      isSuccess,
      submitError,
      setSubmitError,
      register,
      login,
      logout,
    }),
    [user, accessToken, isAuthenticated, isLoading, isSuccess, submitError],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
