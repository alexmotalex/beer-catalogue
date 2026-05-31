import { Link, NavLink } from 'react-router';
import { Icon } from '../Icon';
import { createNavLinkClass } from '../../utils/createNavLinkClass';
import { ICON_COLOR_MAP } from '../../constants/colors';
import styles from './Header.module.scss';

const getNavLinkClassName = createNavLinkClass(styles, 'navigationLink');
const getActionLinkClassName = createNavLinkClass(styles, 'actionLink');

export const Header = () => {
  const colors = ICON_COLOR_MAP['main'];

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
          {({ isActive }) => (
            <Icon
              name="cart"
              active={isActive}
              defaultColor={colors.default}
              activeColor={colors.active}
            />
          )}
        </NavLink>

        <NavLink
          to="/login"
          className={getActionLinkClassName}
          aria-label="Open login page"
        >
          {({ isActive }) => (
            <Icon
              name="acc"
              active={isActive}
              defaultColor={colors.default}
              activeColor={colors.active}
            />
          )}
        </NavLink>
      </div>
    </header>
  );
};
