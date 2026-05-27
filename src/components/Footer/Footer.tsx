import { Link } from 'react-router';
import styles from './Footer.module.scss';
import clsx from 'clsx';

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
              <li>
                <Link className={styles.footerLink} to="/faq">
                  FAQ
                </Link>
              </li>

              <li>
                <Link className={styles.footerLink} to="/contact">
                  Contact
                </Link>
              </li>

              <li>
                <Link className={styles.footerLink} to="/delivery">
                  Delivery & Returns
                </Link>
              </li>

              <li>
                <Link className={styles.footerLink} to="/accessibility">
                  Accessibility
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.column}>
          <h2 className={styles.title}>Legal</h2>

          <nav aria-label="Legal navigation">
            <ul className={styles.linkList}>
              <li>
                <Link className={styles.footerLink} to="/privacy">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link className={styles.footerLink} to="/terms">
                  Terms of Service
                </Link>
              </li>

              <li>
                <Link className={styles.footerLink} to="/cookie">
                  Cookie Policy
                </Link>
              </li>

              <li>
                <Link className={styles.footerLink} to="/responsibility">
                  Responsibility
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </section>

      <section className={styles.social}>
        <Link
          to="/"
          className={styles.logoLink}
          aria-label="Craft Beer home page"
        >
          <img
            className={styles.logoImage}
            src="./img/beer-logo-light.png"
            alt="Craft Beer"
          />
        </Link>

        <nav aria-label="Social media links">
          <ul className={styles.socialList}>
            <li>
              <a
                href="/"
                target="_blank"
                className={styles.socialLink}
                aria-label="Facebook"
              >
                <span
                  className={clsx(styles.icon, styles.facebookIcon)}
                  aria-hidden="true"
                />
              </a>
            </li>

            <li>
              <a
                href="/"
                target="_blank"
                className={styles.socialLink}
                aria-label="Instagram"
              >
                <span
                  className={clsx(styles.icon, styles.instagramIcon)}
                  aria-hidden="true"
                />
              </a>
            </li>

            <li>
              <a
                href="/"
                target="_blank"
                className={styles.socialLink}
                aria-label="X"
              >
                <span
                  className={clsx(styles.icon, styles.xIcon)}
                  aria-hidden="true"
                />
              </a>
            </li>
          </ul>
        </nav>
      </section>
    </footer>
  );
};
