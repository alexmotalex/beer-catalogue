import React, { useEffect, useRef } from 'react';
import styles from './AccountModal.module.scss';
import { Icon } from '../Icon';
import { ROUTES } from '../../constants/routes';
import { useNavigate } from 'react-router';
import { Divider } from '../Divider';
import { useAuth } from '../../hooks/useAuth';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';

interface Props {
  closeFn: () => void;
}

export const AccountModal: React.FC<Props> = ({ closeFn }) => {
  const { logout, user } = useAuth();

  const dialogRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const userFullName = [user?.first_name, user?.last_name]
    .filter(Boolean)
    .map(capitalizeFirstLetter)
    .join(' ');

  const handleEdit = () => {
    closeFn();
    navigate(ROUTES.editUser);
  };

  const handleChangePassword = () => {
    closeFn();
    navigate(ROUTES.changePassword);
  };

  const handleHelpCenter = () => {
    closeFn();
    navigate(ROUTES.help);
  };

  const handleLogOut = () => {
    closeFn();
    logout();
  };

  useEffect(() => {
    const focusableSelectors = [
      'button',
      '[href]',
      'input',
      'select',
      'textarea',
      '[tabindex]:not([tabindex="-1"])',
    ].join(',');

    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    const focusableElements = Array.from(
      dialog.querySelectorAll<HTMLElement>(focusableSelectors),
    );

    const FIRST_INDEX = 0;
    const LAST_INDEX = focusableElements.length - 1;

    const firstElement = focusableElements[FIRST_INDEX];
    const lastElement = focusableElements[LAST_INDEX];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') {
        return;
      }

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }

        return;
      }

      // Tab
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeFn();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeFn]);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Account menu"
      tabIndex={-1}
      className={styles.dialog}
      onClick={e => e.stopPropagation()}
    >
      <div className={styles.userInfoWrapper}>
        <div className={styles.userInfo}>
          <p className={styles.userName}>{userFullName}</p>
          <p className={styles.userEmail}>{user?.email}</p>
        </div>

        <button type="button" className={styles.userEdit} onClick={handleEdit}>
          <Icon name="edit" />
        </button>
      </div>

      <div className={styles.optionsWrapper}>
        <div className={styles.option}>
          <p className={styles.optionTitle}>Change password</p>

          <button
            type="button"
            className={styles.optionButton}
            onClick={handleChangePassword}
          >
            <Icon name="right-arrow" />
          </button>
        </div>

        <Divider />

        <div className={styles.option}>
          <p className={styles.optionTitle}>Help center</p>

          <button
            type="button"
            className={styles.optionButton}
            onClick={handleHelpCenter}
          >
            <Icon name="right-arrow" />
          </button>
        </div>
      </div>

      <div className={styles.logOutWrapper}>
        <button
          type="button"
          className={styles.logOutButton}
          onClick={handleLogOut}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};
