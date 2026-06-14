import { useAuth } from '../../hooks/useAuth';
import styles from './UserPage.module.scss';

export const UserPage = () => {
  const { logout } = useAuth();

  return (
    <section className={styles.userPage}>
      <button onClick={logout}>LogOut</button>
    </section>
  );
};
