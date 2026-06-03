import styles from './PrimaryButton.module.scss';

type Props = {
  title: string;
  onClick: () => Promise<void> | void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

export const PrimaryButton: React.FC<Props> = ({
  title,
  onClick,
  type = 'button',
  disabled = false,
}) => {
  return (
    <button
      type={type}
      className={styles.primaryButton}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};
