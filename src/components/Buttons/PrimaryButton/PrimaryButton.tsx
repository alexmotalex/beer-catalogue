import clsx from 'clsx';
import styles from './PrimaryButton.module.scss';

type Props = {
  title: string;
  onClick: () => void;
  isInCart?: boolean;
  disabled?: boolean;
};

export const PrimaryButton: React.FC<Props> = ({
  title,
  onClick,
  isInCart = false,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      className={clsx(styles.primaryButton, { [styles.isAdded]: isInCart })}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};
