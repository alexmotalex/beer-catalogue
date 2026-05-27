import { Link, NavLink } from 'react-router';
import clsx from 'clsx';
import styles from './Header.module.scss';
import { createNavLinkClass } from '../../utils/createNavLinkClass';

const getNavLinkClassName = createNavLinkClass(styles, 'navigationLink');

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link
        to="/"
        className={styles.logoLink}
        aria-label="Craft Beer home page"
      >
        <img
          className={styles.logoImage}
          src="./img/beer-logo-dark.png"
          alt="Craft Beer"
        />
      </Link>

      <nav aria-label="Main navigation">
        <ul className={styles.navigationList}>
          <li className={styles.navigationItem}>
            <NavLink className={getNavLinkClassName} to="/">
              Home
            </NavLink>
          </li>

          <li className={styles.navigationItem}>
            <NavLink className={getNavLinkClassName} to="/catalogue">
              Catalogue
            </NavLink>
          </li>

          <li className={styles.navigationItem}>
            <NavLink className={getNavLinkClassName} to="/about">
              About Us
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className={styles.actions}>
        <Link to="/cart" className={styles.actionLink} aria-label="Open cart">
          <span
            className={clsx(styles.icon, styles.cartIcon)}
            aria-hidden="true"
          />
        </Link>

        <Link
          to="/login"
          className={styles.actionLink}
          aria-label="Open login page"
        >
          <span
            className={clsx(styles.icon, styles.accountIcon)}
            aria-hidden="true"
          />
        </Link>
      </div>
    </header>
  );
};
