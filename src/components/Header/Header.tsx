import { Link, NavLink } from 'react-router';
import { Icon } from '../Icon';
import { createNavLinkClass } from '../../utils/createNavLinkClass';
import styles from './Header.module.scss';
import {
  HEADER_ACTIONS_LINKS,
  HEADER_MAIN_LINKS,
} from '../../constants/navLinks';

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
          {HEADER_MAIN_LINKS.map(item => (
            <li key={item.label} className={styles.navigationItem}>
              <NavLink className={getNavLinkClassName} to={item.to}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={styles.actions}>
        {HEADER_ACTIONS_LINKS.map(item => (
          <NavLink
            key={item.label}
            to={item.to}
            className={getActionLinkClassName}
            aria-label={item.label}
          >
            <Icon name={item.name} />
          </NavLink>
        ))}
      </div>
    </header>
  );
};
