import style from './SecondaryButton.module.scss';

type Props = {
  title: string;
  onClick: () => void;
};

export const SecondaryButton: React.FC<Props> = ({ title, onClick }) => {
  return (
    <button type="button" className={style.secondaryButton} onClick={onClick}>
      {title}
    </button>
  );
};
