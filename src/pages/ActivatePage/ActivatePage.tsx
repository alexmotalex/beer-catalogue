import { useNavigate, useSearchParams } from 'react-router';
// import styles from './ActivatePage.module.scss';

import { useEffect } from 'react';
import { client } from '../../utils/axiosClient';

export const ActivatePage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  useEffect(() => {
    const activateAccount = async (token: string) => {
      try {
        await client.post('/users/activate', { token });

        navigate('/login');
      } catch {
        console.error('Activation failed:');
      }
    };

    if (token) {
      activateAccount(token);
    }
  }, [token, navigate]);

  return <div>Activating your account...</div>;
};
