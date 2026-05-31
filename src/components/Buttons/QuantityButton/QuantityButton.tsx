import styles from './QuantityButton.module.scss';

type Props = {
  iconPath: string;
  onClick: () => void;
  ariaLabel: string;
  disabled?: boolean;
};

export const QuantityButton: React.FC<Props> = ({
  iconPath,
  onClick,
  ariaLabel,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={styles.quantityButton}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <img
        src={iconPath}
        alt={ariaLabel}
        className={styles.icon}
        aria-hidden="true"
      />
    </button>
  );
};
