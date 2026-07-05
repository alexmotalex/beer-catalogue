import { useEffect, useState } from 'react';
import styles from './ScrollToTopButton.module.scss';
import { Icon } from '../../Icon';

const SCROLL_THRESHOLD = 300;

const handleClick = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <button
      type="button"
      className={styles.button}
      onClick={handleClick}
      aria-label="Scroll to top"
    >
      <span className={styles.buttonIcon}>
        <Icon name="arrow-up" />
      </span>
    </button>
  );
};
