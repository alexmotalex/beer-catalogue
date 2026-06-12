import { Icon } from '../Icon';
import styles from './SuccessMessage.module.scss';

type Props = {
  title: string;
};

export const SuccessMessage: React.FC<Props> = ({ title }) => {
  return (
    <div className={styles.message}>
      <div className={styles.messageTick}>
        <div className={styles.messageTickIconWrapper}>
          <Icon name="tick" />
        </div>
      </div>
      <span className={styles.messageTitle}>{title}</span>
    </div>
  );
};
