import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <section className={styles.aboutUs}>
        <div className={styles.overview}>
          <h2 className={styles.sloganPart1}>Small batches.</h2>
          <h2 className={styles.sloganPart2}>Big personality.</h2>

          <p className={styles.text}>
            Small-batch brews with bold character, crafted for those who value
            real taste over mass production.
          </p>
        </div>

        <button>Browse beers</button>
      </section>
    </div>
  );
};
