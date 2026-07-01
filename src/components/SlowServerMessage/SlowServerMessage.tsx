import { Spinner } from '../Spinner';
import styles from './SlowServerMessage.module.scss';

export const SlowServerMessage = () => (
  <div className={styles.wrapper}>
    <Spinner />
    <p className={styles.title}>Waking up the server...</p>
    <p className={styles.subtitle}>
      Our server starts from sleep on first visit. This usually takes up to one
      minute. Thank you for your patience!
    </p>
  </div>
);
