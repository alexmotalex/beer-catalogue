import { MainButton } from '../../components/Buttons/MainButton';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <section className={styles.brew}>
        <div className={styles.brewContent}>
          <div className={styles.brewTextContent}>
            <h1 className={styles.brewTitleSmall}>
              Small batches.
              <span className={styles.brewTitleLarge}>Big personality.</span>
            </h1>

            <p className={styles.brewDescription}>
              Small-batch brews with bold character, crafted for those who value
              real taste over mass production.
            </p>
          </div>

          <div className={styles.brewButtonWrapper}>
            <MainButton title="Browse beers" handleClick={() => {}} />
          </div>
        </div>
      </section>

      <section className={styles.story}>
        <div className={styles.storyContent}>
          <span className={styles.storyYear}>1776</span>

          <h2 className={styles.storyTitle}>Our Story</h2>

          <div className={styles.storyText}>
            <p className={styles.storyParagraph}>
              Craft beer is more than a drink — it’s a tradition, a craft, and a
              feeling. We curate beers from independent breweries that value
              quality, heritage, and creativity. Every bottle we offer carries a
              story shaped by time, passion, and brewing mastery.
            </p>

            <p className={styles.storyParagraph}>
              Craft beer is more than a drink — it’s a tradition, a craft, and a
              feeling. We curate beers from independent breweries that value
              quality, heritage, and creativity. Every bottle we offer carries a
              story shaped by time, passion, and brewing mastery.
            </p>
          </div>
        </div>

        <div className={styles.storyImage} aria-hidden="true" />
      </section>

      <section className={styles.description}>
        <div className={styles.descriptionBlock}>
          <span className={styles.descriptionNumber}>1</span>
          <h3 className={styles.descriptionTitle}>Visual Character</h3>
          <p className={styles.descriptionText}>
            From light gold to deep dark tones, with natural haze or clarity and
            lasting foam.
          </p>
        </div>

        <div className={styles.divider} />

        <div className={styles.descriptionBlock}>
          <span className={styles.descriptionNumber}>2</span>
          <h3 className={styles.descriptionTitle}>Aromatic Profile</h3>
          <p className={styles.descriptionText}>
            Hops, malt, and yeast with notes of citrus, fruit, caramel, and
            spice.
          </p>
        </div>

        <div className={styles.divider} />

        <div className={styles.descriptionBlock}>
          <span className={styles.descriptionNumber}>3</span>
          <h3 className={styles.descriptionTitle}>Flavor Impression</h3>
          <p className={styles.descriptionText}>
            From crisp and refreshing to rich and full-bodied, always balanced
            and smooth.
          </p>
        </div>
      </section>
    </div>
  );
};
