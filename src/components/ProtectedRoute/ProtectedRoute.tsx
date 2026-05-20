import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router';
// import styles from './ProtectedRoute.scss';

type Props = {
  children: React.ReactNode;
};

export const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  return children;
};
