import type React from 'react';
import { useId, useState } from 'react';
import styles from './LabeledInput.module.scss';
import { Icon } from '../Icon';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  type?: string;
};

export const LabeledInput: React.FC<Props> = ({
  label,
  type = 'text',
  ...rest
}) => {
  const inputId = useId();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const actualInputType =
    type === 'password' && isPasswordVisible ? 'text' : type;

  return (
    <div className={styles.wrapper}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>

      <div className={styles.inputWrapper}>
        <input
          id={inputId}
          type={actualInputType}
          className={styles.input}
          {...rest}
        />

        {type === 'password' && (
          <button
            type="button"
            className={styles.visibilityButton}
            onClick={() => setIsPasswordVisible(currentValue => !currentValue)}
          >
            {isPasswordVisible ? (
              <Icon name="visible" size={20} />
            ) : (
              <Icon name="invisible" size={20} />
            )}
          </button>
        )}
      </div>
    </div>
  );
};
