import { useNavigate, useSearchParams } from 'react-router';
import { useEffect, useState } from 'react';
import { client } from '../../utils/axiosClient';
import { ROUTES } from '../../constants/routes';
// import styles from './ActivatePage.module.scss';

type Status = 'pending' | 'error';

export const ActivatePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token') || '';
  const [status, setStatus] = useState<Status>(() =>
    !token ? 'error' : 'pending',
  );

  useEffect(() => {
    if (!token) {
      return;
    }

    const activateAccount = async () => {
      try {
        await client.post('/users/activate', { token });

        navigate(ROUTES.signIn);
      } catch (error) {
        console.error(error);
        setStatus('error');
      }
    };

    activateAccount();
  }, [token, navigate]);

  if (status === 'error') {
    return (
      <div>
        This activation link is invalid or has expired. Please try signing up
        again or request a new link.
      </div>
    );
  }

  return <div>Activating your account...</div>;
};
