import clsx from 'clsx';
import { Icon } from '../Icon';
import styles from './Stepper.module.scss';

type Props = {
  value: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onDelete: () => void;
};

export const Stepper: React.FC<Props> = ({
  value,
  onIncrease,
  onDecrease,
  onDelete,
}) => {
  const isDisabled = value < 1;
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
        className={styles.stepperButton}
        onClick={handleLeftButtonClick}
        aria-label={isDisabled ? 'Remove item' : 'Decrease quantity'}
      >
        <Icon name={leftButtonIcon} />
      </button>

      <div
        className={clsx(
          styles.stepperValue,
          isDisabled && styles.stepperValueDisabled,
        )}
      >
        {value}
      </div>

      <button
        type="button"
        disabled={value < 1}
        className={styles.stepperButton}
        onClick={onIncrease}
        aria-label="Increase quantity"
      >
        <Icon name="plus" />
      </button>
    </div>
  );
};
