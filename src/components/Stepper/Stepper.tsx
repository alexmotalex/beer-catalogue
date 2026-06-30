import clsx from 'clsx';
import { Icon } from '../Icon';
import styles from './Stepper.module.scss';

type Props = {
  value: number;
  error: boolean;
  isLoading: boolean;
  onIncrease: () => void;
  onDecrease: () => void;
  onDelete: () => void;
};

export const Stepper: React.FC<Props> = ({
  value,
  isLoading,
  error,
  onIncrease,
  onDecrease,
  onDelete,
}) => {
  const isDisabled = value < 1 || Boolean(isLoading) || error;
  const isDeleteButton = value === 1;
  const leftButtonIcon = isDeleteButton ? 'trash' : 'minus';

  const handleLeftButtonClick = () => {
    if (isDeleteButton) {
      onDelete();

      return;
    }

    onDecrease();
  };

  return (
    <div className={styles.stepper}>
      <button
        type="button"
        disabled={isDisabled}
        className={styles.button}
        onClick={handleLeftButtonClick}
        aria-label={isDisabled ? 'Remove item' : 'Decrease quantity'}
      >
        <Icon name={leftButtonIcon} />
      </button>

      <div className={clsx(styles.value, isDisabled && styles.valueDisabled)}>
        {value}
      </div>

      <button
        type="button"
        disabled={isDisabled}
        className={styles.button}
        onClick={onIncrease}
        aria-label="Increase quantity"
      >
        <Icon name="plus" />
      </button>
    </div>
  );
};
