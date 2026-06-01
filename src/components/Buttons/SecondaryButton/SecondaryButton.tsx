import style from './SecondaryButton.module.scss';

type Props = {
  title: string;
  onClick: () => void;
  disabled?: boolean;
};

export const SecondaryButton: React.FC<Props> = ({
  title,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      type="button"
      className={style.secondaryButton}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};
