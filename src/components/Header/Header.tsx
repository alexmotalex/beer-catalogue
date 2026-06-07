import { Link, NavLink, useLocation } from 'react-router';
import { Icon } from '../Icon';
import { InfoHeaderLink } from '../InfoHeaderLink';
import { useAuth } from '../../hooks/useAuth';
import { createNavLinkClass } from '../../utils/createNavLinkClass';
import {
  HEADER_ACTIONS_LINKS,
  HEADER_MAIN_LINKS,
} from '../../constants/navLinks';
import { HIDDEN_ROUTES, ROUTES } from '../../constants/routes';
import styles from './Header.module.scss';

const getNavLinkClassName = createNavLinkClass(styles, 'navigationLink');
const getActionLinkClassName = createNavLinkClass(styles, 'actionLink');

export const Header = () => {
  const { pathname } = useLocation();
  const { isAuthenticated } = useAuth();

  const shouldHideMainNavigation = HIDDEN_ROUTES.some(
    route => route === pathname,
  );

  const renderHeaderActions = () => {
    if (shouldHideMainNavigation) {
      return (
        <InfoHeaderLink path={ROUTES.help} title="Help Center" icon="help" />
      );
    }

    if (isAuthenticated) {
      return (
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
      );
    }

    return <InfoHeaderLink path={ROUTES.signIn} title="Log In" icon="log-in" />;
  };

  return (
    <header className={styles.header}>
      <Link
        to={ROUTES.home}
        className={styles.logoLink}
        aria-label="Craft Beer home page"
      >
        <img
          className={styles.logoImage}
          src="./img/beer-logo-dark.png"
          alt="Craft Beer"
        />
      </Link>

      {!shouldHideMainNavigation && (
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
      )}

      {renderHeaderActions()}
    </header>
  );
};
