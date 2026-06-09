import React, { useEffect, useMemo, useState } from 'react';
import { instance } from '../../api/axiosInstance';
import { AuthContext } from './AuthContext';
import { client } from '../../utils/axiosClient';
import type { AuthCredentials, RegisterUserData, User } from '../../types/User';
import type { ServerErrors } from '../../types/Forms';
import { mapServerErrors } from '../../utils/mapServerErrors';

export type AuthContextType = {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  serverErrors: ServerErrors;
  setServerErrors: (err: ServerErrors) => void;
  login: (data: AuthCredentials) => Promise<boolean>;
  register: (data: RegisterUserData) => Promise<boolean>;
  logout: () => Promise<void>;
};

export type Props = {
  children: React.ReactNode;
};

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState<ServerErrors>({});

  const isAuthenticated = Boolean(user && accessToken);

  const register = async (data: RegisterUserData) => {
    setIsLoading(true);
    setServerErrors({});

    try {
      await client.post('/users/register', data);

      return true;
    } catch (error: unknown) {
      const axiosError = error as {
        response?: { data?: { detail?: unknown; message?: string } };
      };
      const details = axiosError.response?.data?.detail;

      if (typeof details === 'string') {
        setServerErrors({
          email: details,
        });

        return false;
      }

      const serverErrors = mapServerErrors(details);
      setServerErrors(serverErrors);

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: AuthCredentials) => {
    setIsLoading(true);
    setServerErrors({});

    try {
      const response = await instance.post('/users/login', data);

      setAccessToken(response.data.access_token);

      return true;
    } catch (error) {
      const axiosError = error as {
        response?: { data?: { detail?: unknown; message?: string } };
      };
      const details = axiosError.response?.data?.detail;

      if (typeof details === 'string') {
        setServerErrors({
          email: details,
        });

        return false;
      }

      const serverErrors = mapServerErrors(details);
      setServerErrors(serverErrors);

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await instance.post('/logout');
    } finally {
      setAccessToken(null);
    }
  };

  useEffect(() => {
    const refreshSession = async () => {
      try {
        const response = await instance.post('/refresh');

        setUser(response.data.user);
        setAccessToken(response.data.accessToken);
      } catch {
        setUser(null);
        setAccessToken(null);
      } finally {
        setIsLoading(false);
      }
    };

    refreshSession();
  }, []);

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
      serverErrors,
      setServerErrors,
      register,
      login,
      logout,
    }),
    [user, accessToken, isAuthenticated, isLoading, serverErrors],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
