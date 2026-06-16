import type React from 'react';
import { Icon } from '../Icon';
import styles from './ErrorInfo.module.scss';

type Props = {
  errorText: string;
};

export const ErrorInfo: React.FC<Props> = ({ errorText }) => {
  return (
    <div className={styles.inputError}>
      <div className={styles.inputErrorIconWrapper}>
        <Icon name="error" />
      </div>
      <span className={styles.inputErrorText}>{errorText}</span>
    </div>
  );
};
