import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AuthContext } from './AuthContext';
import { client } from '../../utils/axiosClient';
import { instance } from '../../api/axiosInstance';
import { extractServerErrors } from '../../utils/extractServerErrors';
import type {
  AuthCredentials,
  ForgotPasswordFormData,
  NewPasswordServerData,
  ServerErrors,
} from '../../types/Forms';
import type { EditUserData, RegisterUserData, User } from '../../types/User';

const HAS_SESSION_KEY = 'hasSession';

export type AuthContextType = {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  serverErrors: ServerErrors;
  setServerErrors: (err: ServerErrors) => void;
  register: (data: RegisterUserData) => Promise<boolean>;
  login: (data: AuthCredentials) => Promise<boolean>;
  setNewPassword: (data: NewPasswordServerData) => Promise<boolean>;
  editUser: (data: EditUserData) => Promise<boolean>;
  passwordReset: (data: ForgotPasswordFormData) => Promise<boolean>;
  logout: () => Promise<void>;
};

export type Props = {
  children: React.ReactNode;
};

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [serverErrors, setServerErrors] = useState<ServerErrors>({});

  const isAuthenticated = Boolean(accessToken);

  const register = useCallback(async (data: RegisterUserData) => {
    setIsLoading(true);
    setServerErrors({});

    try {
      await client.post('/users/register/', data);

      return true;
    } catch (error: unknown) {
      setServerErrors(extractServerErrors(error));

      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const passwordReset = useCallback(async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    setServerErrors({});

    try {
      await client.post('/users/password-reset-request/', data);

      return true;
    } catch (error: unknown) {
      setServerErrors(extractServerErrors(error));

      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchUser = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await instance.get('/users/me/');
      setUser(response.data);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setNewPassword = useCallback(async (data: NewPasswordServerData) => {
    setIsLoading(true);
    setServerErrors({});

    try {
      await instance.post('/users/password-reset-complete/', data);

      return true;
    } catch (error) {
      setServerErrors(extractServerErrors(error));

      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(
    async (data: AuthCredentials) => {
      setIsLoading(true);
      setServerErrors({});

      try {
        const response = await instance.post('/users/login/', data);
        const token = response.data.access_token;

        setAccessToken(token);
        localStorage.setItem(HAS_SESSION_KEY, 'true');

        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await fetchUser();

        return true;
      } catch (error) {
        setServerErrors(extractServerErrors(error));

        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchUser],
  );

  const editUser = useCallback(async (data: EditUserData) => {
    setIsLoading(true);
    setServerErrors({});

    try {
      await instance.patch('/users/me/', data);

      return true;
    } catch (error) {
      setServerErrors(extractServerErrors(error, 'general'));

      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await client.post('/users/logout/', {});
    } finally {
      delete instance.defaults.headers.common['Authorization'];
      localStorage.removeItem(HAS_SESSION_KEY);
      setAccessToken(null);
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const refreshSession = async () => {
      try {
        const response = await instance.post('/users/refresh/', {});
        const token = response.data.access_token;

        instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        setAccessToken(token);
        await fetchUser();

        return true;
      } catch {
        localStorage.removeItem(HAS_SESSION_KEY);
        setAccessToken(null);
        setUser(null);

        return false;
      }
    };

    const initAuth = async () => {
      const hasSession = localStorage.getItem(HAS_SESSION_KEY) === 'true';

      if (!hasSession) {
        setIsLoading(false);

        return;
      }

      setIsLoading(true);

      const success = await refreshSession();

      if (!success) {
        setUser(null);
        setAccessToken(null);
      }

      setIsLoading(false);
    };

    initAuth();
  }, [fetchUser]);

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
      setNewPassword,
      editUser,
      passwordReset,
      logout,
    }),
    [
      login,
      setNewPassword,
      logout,
      register,
      editUser,
      passwordReset,
      user,
      accessToken,
      isAuthenticated,
      isLoading,
      serverErrors,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
