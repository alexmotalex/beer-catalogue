import React from 'react';
import { MainButton } from '../../components/Buttons/MainButton';
import { beerDescriptions } from '../../constants/beerDescriptions';
import { storyParagraphs } from '../../constants/storyParagraphs';
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
            {storyParagraphs.map(p => (
              <p key={p.id} className={styles.storyParagraph}>
                {p.paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className={styles.storyImage} aria-hidden="true" />
      </section>

      <section className={styles.description}>
        {beerDescriptions.map((d, index) => (
          <React.Fragment key={d.id}>
            <div className={styles.descriptionBlock}>
              <span className={styles.descriptionNumber}>{d.id}</span>
              <h3 className={styles.descriptionTitle}>{d.title}</h3>
              <p className={styles.descriptionText}>{d.text}</p>
            </div>

            {index < beerDescriptions.length - 1 && (
              <div className={styles.divider} />
            )}
          </React.Fragment>
        ))}
      </section>
    </div>
  );
};
