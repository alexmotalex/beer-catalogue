import { Link } from "react-router";
import { PiShoppingCartSimple } from "react-icons/pi";
import { VscAccount } from "react-icons/vsc";

import styles from "./Header.module.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link to="/">
          <img src="./img/beer-logo.png" alt="Beer" />
          <span className="sr-only">Craft Beer</span>
        </Link>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/catalogue">Catalogue</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>

      <div className={styles.icons}>
        <Link to="/cart" className={styles.iconBtn}>
          <PiShoppingCartSimple />
        </Link>

        <Link to="/login" className={styles.iconBtn} aria-label="Login">
          <VscAccount />
        </Link>
      </div>
    </header>
  );
};
