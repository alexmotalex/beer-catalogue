import React, { useEffect, useMemo, useState } from 'react';
import { instance } from '../../api/axiosInstance';
import { AuthContext } from './AuthContext';
import type { AuthContextType, UserData, User } from '../../types/AuthContext';

export type Props = {
  children: React.ReactNode;
};

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const [user] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading] = useState(true);

  const isAuthenticated = Boolean(user && accessToken);

  const register = async (data: UserData) => {
    const response = await instance.post('/register', data);

    setAccessToken(response.data.access_token);
  };

  const login = async (data: UserData) => {
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
    const interceptorId = instance.interceptors.request.use((config) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    });

    return () => {
      instance.interceptors.request.eject(interceptorId);
    };
  }, [accessToken]);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      accessToken,
      isAuthenticated,
      isLoading,
      register,
      login,
      logout,
    }),
    [user, accessToken, isAuthenticated, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
