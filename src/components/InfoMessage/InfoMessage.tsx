import { Icon } from '../Icon';
import styles from './InfoMessage.module.scss';

type Props = {
  title: string;
  icon?: string;
};

export const InfoMessage: React.FC<Props> = ({ title, icon = 'tick' }) => {
  return (
    <div className={styles.message}>
      <div className={styles.messageTick}>
        <div className={styles.messageTickIconWrapper}>
          <Icon name={icon} />
        </div>
      </div>
      <span className={styles.messageTitle}>{title}</span>
    </div>
  );
};
