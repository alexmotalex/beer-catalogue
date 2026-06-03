import type React from 'react';
import { useId } from 'react';
import styles from './Checkbox.module.scss';
import clsx from 'clsx';
import { Icon } from '../Icon';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: boolean;
};

export const Checkbox: React.FC<Props> = ({
  label,
  error = false,
  ...rest
}) => {
  const inputId = useId();

  return (
    <div className={clsx(styles.checkbox, error && styles.checkboxError)}>
      <label htmlFor={inputId} className={styles.checkboxLabel}>
        <input
          id={inputId}
          type="checkbox"
          {...rest}
          className={styles.checkboxInput}
        />

        <span className={styles.checkboxControl}>
          <div className={styles.checkboxIcon}>
            <Icon name="tick" color="white" size={20} />
          </div>
        </span>

        <span className={styles.checkboxLabelText}>{label}</span>
      </label>
    </div>
  );
};
