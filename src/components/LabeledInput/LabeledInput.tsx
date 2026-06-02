import type React from 'react';
import { useId } from 'react';
import styles from './LabeledInput.module.scss';

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export const LabeledInput: React.FC<Props> = ({
  label,
  type = 'text',
  ...rest
}) => {
  const inputId = useId();
  return (
    <div className={styles.wrapper}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>
      <input id={inputId} type={type} {...rest} className={styles.input} />
    </div>
  );
};
