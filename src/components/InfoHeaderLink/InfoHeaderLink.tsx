import type React from 'react';
import { Icon } from '../Icon';
import styles from './InfoHeaderLink.module.scss';
import { Link } from 'react-router';

type Props = {
  path: string;
  title: string;
  icon: string;
};

export const InfoHeaderLink: React.FC<Props> = ({ path, title, icon }) => {
  return (
    <Link to={path} className={styles.infoHeader}>
      <span className={styles.infoHeaderTitle}>{title}</span>
      <div className={styles.infoHeaderIconWrapper}>
        <Icon name={icon} />
      </div>
    </Link>
  );
};
