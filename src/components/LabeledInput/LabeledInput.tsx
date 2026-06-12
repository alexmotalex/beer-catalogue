import type React from 'react';
import { useId, useState } from 'react';
import styles from './LabeledInput.module.scss';
import { Icon } from '../Icon';
import clsx from 'clsx';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  value: string;
  type?: string;
  error?: boolean;
};

export const LabeledInput: React.FC<Props> = ({
  label,
  value,
  type = 'text',
  error = false,
  ...rest
}) => {
  const inputId = useId();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const actualInputType =
    type === 'password' && isPasswordVisible ? 'text' : type;
  const shouldShowVisibilityButton = type === 'password' && value.length > 0;

  return (
    <div className={styles.wrapper}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>

      <div className={styles.inputWrapper}>
        <input
          id={inputId}
          type={actualInputType}
          className={clsx(styles.input, error && styles.inputError)}
          value={value}
          {...rest}
        />

        {shouldShowVisibilityButton && (
          <button
            type="button"
            className={styles.visibilityButton}
            onClick={() => setIsPasswordVisible(currentValue => !currentValue)}
            aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
          >
            {isPasswordVisible ? (
              <div className={styles.visibilityButtonIconWrapper}>
                <Icon name="visible" />
              </div>
            ) : (
              <div className={styles.visibilityButtonIconWrapper}>
                <Icon name="invisible" />
              </div>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
