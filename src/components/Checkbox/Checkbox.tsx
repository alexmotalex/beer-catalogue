import type React from 'react';
import { useId } from 'react';
import styles from './Checkbox.module.scss';
import clsx from 'clsx';
import { Icon } from '../Icon';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: React.ReactNode;
  error?: boolean;
};

export const Checkbox: React.FC<Props> = ({
  label,
  error = false,
  ...rest
}) => {
  const inputId = useId();

  return (
    <label
      htmlFor={inputId}
      className={clsx(styles.checkbox, error && styles.checkboxError)}
    >
      <input
        id={inputId}
        type="checkbox"
        {...rest}
        className={styles.checkboxInput}
      />

      <span className={styles.checkboxControl}>
        <span className={styles.checkboxIcon}>
          <div className={styles.checkboxIconWrapper}>
            <Icon name="tick" />
          </div>
        </span>
      </span>

      <span className={styles.checkboxLabelText}>{label}</span>
    </label>
  );
};
