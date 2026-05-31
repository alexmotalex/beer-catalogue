import clsx from 'clsx';
import styles from './PrimaryButton.module.scss';

type Props = {
  title: string;
  onClick: () => void;
  isInCart?: boolean;
};

export const PrimaryButton: React.FC<Props> = ({
  title,
  onClick,
  isInCart = false,
}) => {
  return (
    <button
      type="button"
      className={clsx(styles.primaryButton, { [styles.isAdded]: isInCart })}
      onClick={onClick}
    >
      {title}
    </button>
  );
};
