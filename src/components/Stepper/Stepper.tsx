import clsx from 'clsx';
import { Icon } from '../Icon';
import styles from './Stepper.module.scss';
import { useState } from 'react';

type Props = {
  value: number;
  error: boolean;
  isLoading: boolean;
  onIncrease: () => void;
  onDecrease: () => void;
  onDelete: () => void;
  onChange?: (value: number) => void;
};

export const Stepper: React.FC<Props> = ({
  value,
  isLoading,
  error,
  onIncrease,
  onDecrease,
  onDelete,
  onChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(String(value));

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

  const handleDoubleClick = () => {
    if (!onChange) {
      return;
    }

    setInputValue(String(value));
    setIsEditing(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // allow only digits
    const next = e.target.value.replace(/\D/g, '');
    setInputValue(next);
  };

  const commitEdit = () => {
    setIsEditing(false);

    const parsed = parseInt(inputValue, 10);

    if (!Number.isNaN(parsed) && parsed >= 0 && onChange) {
      onChange(parsed);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      commitEdit();
    }

    if (e.key === 'Escape') {
      setIsEditing(false);
      setInputValue(String(value));
    }
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

      {isEditing ? (
        <input
          type="text"
          inputMode="numeric"
          className={styles.valueInput}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={commitEdit}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <div
          className={clsx(styles.value, isDisabled && styles.valueDisabled)}
          onDoubleClick={handleDoubleClick}
        >
          {value}
        </div>
      )}

      <button
        type="button"
        disabled={Boolean(isLoading) || error}
        className={styles.button}
        onClick={onIncrease}
        aria-label="Increase quantity"
      >
        <Icon name="plus" />
      </button>
    </div>
  );
};
