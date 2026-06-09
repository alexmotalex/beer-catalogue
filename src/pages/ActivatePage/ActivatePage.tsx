import { useNavigate, useSearchParams } from 'react-router';
// import styles from './ActivatePage.module.scss';

import { useEffect } from 'react';
import { client } from '../../utils/axiosClient';
import { ROUTES } from '../../constants/routes';

export const ActivatePage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  useEffect(() => {
    const activateAccount = async (token: string) => {
      try {
        await client.post('/users/activate', { token });

        navigate(ROUTES.signIn);
      } catch (error) {
        console.log(error);
      }
    };

    if (token) {
      activateAccount(token);
    }
  }, [token, navigate]);

  return <div>Activating your account...</div>;
};
