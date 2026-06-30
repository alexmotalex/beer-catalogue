import { useEffect, useState } from 'react';
import { InfoMessage } from '../InfoMessage';
import styles from './Toast.module.scss';
import clsx from 'clsx';

type Props = {
  title: string;
  icon?: string;
  duration?: number;
  onClose?: () => void;
};

const DEFAULT_DURATION = 3000;
const EXIT_ANIMATION_DURATION = 300; // must match CSS transition duration

export const Toast: React.FC<Props> = ({
  title,
  icon,
  duration = DEFAULT_DURATION,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // trigger enter animation on mount
    const enterTimeout = setTimeout(() => setIsVisible(true), 10);

    // trigger exit animation before unmount
    const exitTimeout = setTimeout(() => {
      setIsExiting(true);
    }, duration);

    // actually unmount after exit animation finishes
    const removeTimeout = setTimeout(() => {
      onClose?.();
    }, duration + EXIT_ANIMATION_DURATION);

    return () => {
      clearTimeout(enterTimeout);
      clearTimeout(exitTimeout);
      clearTimeout(removeTimeout);
    };
  }, [duration, onClose]);

  return (
    <div
      className={clsx(
        styles.toast,
        isVisible && styles.toastVisible,
        isExiting && styles.toastExiting,
      )}
    >
      <InfoMessage title={title} icon={icon} />
    </div>
  );
};
