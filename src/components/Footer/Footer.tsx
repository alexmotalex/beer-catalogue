import { Link } from 'react-router';
import { Icon } from '../Icon';
import {
  FOOTER_LEGAL_LINKS,
  FOOTER_SOCIAL_LINKS,
  FOOTER_SUPPORTS_LINKS,
} from '../../constants/navLinks';
import { ROUTES } from '../../constants/routes';
import clsx from 'clsx';
import styles from './Footer.module.scss';
import beerLogoLight from '../../assets/images/beer-logo-light.png';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <section className={styles.content}>
        <div className={clsx(styles.column, styles.brandColumn)}>
          <h2 className={styles.title}>Craft Beer Store</h2>

          <p className={styles.description}>
            Craft beer inspired by old European brewing traditions. Small
            batches, bold flavors, authentic taste.
          </p>

          <p className={styles.copyright}>
            &copy; 2026 OLD BARREL. All rights reserved.
          </p>
        </div>

        <div className={styles.column}>
          <h2 className={styles.title}>Support</h2>

          <nav aria-label="Support navigation">
            <ul className={styles.linkList}>
              {FOOTER_SUPPORTS_LINKS.map(item => (
                <Link
                  key={item.label}
                  className={styles.footerLink}
                  to={item.to}
                >
                  {item.label}
                </Link>
              ))}
            </ul>
          </nav>
        </div>

        <div className={styles.column}>
          <h2 className={styles.title}>Legal</h2>

          <nav aria-label="Legal navigation">
            <ul className={styles.linkList}>
              {FOOTER_LEGAL_LINKS.map(item => (
                <li key={item.label}>
                  <Link className={styles.footerLink} to={item.to}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <section className={styles.social}>
        <Link
          to={ROUTES.home}
          className={styles.logoLink}
          aria-label="Craft Beer home page"
        >
          <img
            className={styles.logoImage}
            src={beerLogoLight}
            alt="Beer Logo"
          />
        </Link>

        <nav aria-label="Social media links">
          <ul className={styles.socialList}>
            {FOOTER_SOCIAL_LINKS.map(item => (
              <li key={item.label}>
                <a
                  href={item.to}
                  target="_blank"
                  className={styles.socialLink}
                  aria-label={item.label}
                >
                  <div className={styles.socialLinkIconWrapper}>
                    <Icon name={item.name} />
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </section>
    </footer>
  );
};
