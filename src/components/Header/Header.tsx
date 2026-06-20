import { Link, NavLink, useLocation } from 'react-router';
import { Icon } from '../Icon';
import { useState } from 'react';
import { AccountModal } from '../AccountModal';
import { InfoHeaderLink } from '../InfoHeaderLink';
import { useAuth } from '../../hooks/useAuth';
import { useCart } from '../../hooks/useCart';
import { createNavLinkClass } from '../../utils/createNavLinkClass';
import { HEADER_MAIN_LINKS } from '../../constants/navLinks';
import { HIDDEN_ROUTES, ROUTES } from '../../constants/routes';
import styles from './Header.module.scss';
import beerLogoDark from '../../assets/images/beer-logo-dark.png';

const getNavLinkClassName = createNavLinkClass(styles, 'navigationLink');
const getActionLinkClassName = createNavLinkClass(styles, 'actionLink');

export const Header = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { pathname } = useLocation();
  const { isAuthenticated } = useAuth();
  const { quantity } = useCart();

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => {
    setModalIsOpen(false);
  };

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
          <NavLink
            to={ROUTES.cart}
            className={getActionLinkClassName}
            aria-label="Open cart"
          >
            <div className={styles.actionLinkIconWrapper}>
              <Icon name="cart" />
              {quantity > 0 && <p className={styles.quantity}>{quantity}</p>}
            </div>
          </NavLink>

          <div className={styles.actionLink} onClick={openModal}>
            <div className={styles.actionLinkIconWrapper}>
              <Icon name="acc" />
            </div>
          </div>

          {modalIsOpen && (
            <div className={styles.modalWrapper} onClick={closeModal}>
              <AccountModal closeFn={closeModal} />
            </div>
          )}
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
        <img className={styles.logoImage} src={beerLogoDark} alt="Beer Logo" />
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
