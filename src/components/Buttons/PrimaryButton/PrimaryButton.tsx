import clsx from 'clsx';
import style from './PrimaryButton.module.scss';

type Props = {
  title: string;
  handleClick: () => void;
  isInCart?: boolean;
};

export const PrimaryButton: React.FC<Props> = ({
  title,
  handleClick,
  isInCart = false,
}) => {
  return (
    <button
      type="button"
      className={clsx(style.primaryButton, { [style.isAdded]: isInCart })}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};
