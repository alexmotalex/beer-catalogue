import { Link, NavLink } from 'react-router';
import clsx from 'clsx';
import styles from './Header.module.scss';
import { createNavLinkClass } from '../../utils/createNavLinkClass';

const getNavLinkClassName = createNavLinkClass(styles, 'navigationLink');
const getActionLinkClassName = createNavLinkClass(styles, 'actionLink');

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
            <NavLink className={getNavLinkClassName} to="/beers">
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
        <NavLink
          to="/cart"
          className={getActionLinkClassName}
          aria-label="Open cart"
        >
          <span
            className={clsx(styles.actionLinkIcon, styles.cartIcon)}
            aria-hidden="true"
          />
        </NavLink>

        <NavLink
          to="/login"
          className={getActionLinkClassName}
          aria-label="Open login page"
        >
          <span
            className={clsx(styles.actionLinkIcon, styles.accountIcon)}
            aria-hidden="true"
          />
        </NavLink>
      </div>
    </header>
  );
};
