import style from './SecondaryButton.module.scss';

type Props = {
  title: string;
  handleClick: () => void;
};

export const SecondaryButton: React.FC<Props> = ({ title, handleClick }) => {
  return (
    <button
      type="button"
      className={style.secondaryButton}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};
