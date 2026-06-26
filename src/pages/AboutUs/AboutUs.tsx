import { storyParagraphs } from '../../constants/storyParagraphs';
import styles from './AboutUs.module.scss';

export const AboutUs = () => {
  return (
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
  );
};
