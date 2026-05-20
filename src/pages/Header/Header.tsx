import { Link } from 'react-router';

import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link to='/'> Home</Link>
      <h1>HEADER</h1>
    </header>
  );
};
