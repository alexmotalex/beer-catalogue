import { Link } from "react-router";
import clsx from "clsx";

import styles from "./Footer.module.scss";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <section className={styles.column}>
        <h2 className={styles.title}>BEER</h2>

        <p className={styles.description}>
          Craft beer inspired by old European brewing traditions. Small batches,
          bold flavors, authentic taste.
        </p>

        <p className={styles.copyright}>
          &copy; 2026 BEER. All rights reserved.
        </p>
      </section>

      <section className={styles.column}>
        <h2 className={styles.title}>Support</h2>

        <nav>
          <ul className={styles.linksList}>
            <li>
              <Link to="/faq">FAQ</Link>
            </li>

            <li>
              <Link to="/contact">Contact</Link>
            </li>

            <li>
              <Link to="/delivery">Delivery & Returns</Link>
            </li>

            <li>
              <Link to="/accessibility">Accessibility</Link>
            </li>
          </ul>
        </nav>
      </section>

      <section className={styles.column}>
        <h2 className={styles.title}>Legal</h2>

        <nav>
          <ul className={styles.linksList}>
            <li>
              <Link to="/privacy">Privacy Policy</Link>
            </li>

            <li>
              <Link to="/terms">Terms of Service</Link>
            </li>

            <li>
              <Link to="/cookie">Cookie Policy</Link>
            </li>

            <li>
              <Link to="/responsibility">Responsibility</Link>
            </li>
          </ul>
        </nav>
      </section>

      <section className={clsx(styles.column, styles.socialColumn)}>
        <h2 className={styles.title}>Social</h2>

        <nav>
          <ul className={styles.socialList}>
            <li>
              <Link
                to=""
                className={styles.socialLink}
                aria-label="X (Twitter)"
              >
                <img src="./img/x-logo.png" alt="" />
              </Link>
            </li>

            <li>
              <Link to="" className={styles.socialLink} aria-label="LinkedIn">
                <img src="./img/linkedin-logo.png" alt="" />
              </Link>
            </li>

            <li>
              <Link to="" className={styles.socialLink} aria-label="Facebook">
                <img src="./img/facebook-logo.png" alt="" />
              </Link>
            </li>
          </ul>
        </nav>
      </section>
    </footer>
  );
};
