import React, { useEffect, useRef } from 'react';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { SecondaryButton } from '../Buttons/SecondaryButton';
import styles from './CartModal.module.scss';

interface Props {
  isOpen: boolean;
  primaryFn: () => void;
  cancelFn: () => void;
}

export const CartModal: React.FC<Props> = ({ isOpen, cancelFn, primaryFn }) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

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

    firstElement?.focus();

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
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        cancelFn();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, cancelFn]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.backDrop} onClick={cancelFn}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        tabIndex={-1}
        className={styles.dialog}
        onClick={e => e.stopPropagation()}
      >
        <div className={styles.content}>
          <h3 id="modal-title" className={styles.contentTitle}>
            Clear cart?
          </h3>
          <p className={styles.contentText}>
            Are you sure you want to clear your cart? This action cannot be
            undone.
          </p>
        </div>

        <div className={styles.buttons}>
          <SecondaryButton title="Cancel" type="button" onClick={cancelFn} />
          <PrimaryButton title="Clear cart" type="button" onClick={primaryFn} />
        </div>
      </div>
    </div>
  );
};
