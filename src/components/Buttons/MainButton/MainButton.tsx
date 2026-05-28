import clsx from 'clsx';
import style from './MainButton.module.scss';

type Props = {
  title: string;
  handleClick: () => void;
  isInCart?: boolean;
};

export const MainButton: React.FC<Props> = ({
  title,
  handleClick,
  isInCart = false,
}) => {
  return (
    <button
      type="button"
      className={clsx(style.mainButton, { [style.isAdded]: isInCart })}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};
