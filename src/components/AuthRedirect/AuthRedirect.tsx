import type React from 'react';

import styles from './AuthRedirect.module.scss';
import { Link } from 'react-router';

type Props = {
  to: string;
  text: string;
  linkText: string;
};

export const AuthRedirect: React.FC<Props> = ({ text, linkText, to }) => {
  return (
    <div className={styles.authRedirect}>
      {text}
      <Link to={to} className={styles.authRedirectLink}>
        {linkText}
      </Link>{' '}
    </div>
  );
};
