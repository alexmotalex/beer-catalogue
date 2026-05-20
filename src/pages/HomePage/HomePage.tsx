import { Link } from 'react-router';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <section className={styles.homePage}>
      <h1>Home Page</h1>

      <Link to='/login'>Log In</Link>
      <Link to='/register'>Sign In</Link>
    </section>
  );
};
