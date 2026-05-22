import { Link } from "react-router";
import styles from "./HomePage.module.scss";
import { useBeer } from "../../hooks/useBeer";

export const HomePage = () => {
  const { nextOffset, loadBeers } = useBeer();

  console.log(nextOffset);

  return (
    <section className={styles.homePage}>
      <h1>Home Page</h1>

      <Link to="/login">Log In</Link>
      <Link to="/register">Sign In</Link>

      {nextOffset && (
        <button onClick={() => loadBeers(nextOffset)}>Load more</button>
      )}
    </section>
  );
};
