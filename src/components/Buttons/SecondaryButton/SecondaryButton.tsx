import style from './SecondaryButton.module.scss';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
};

export const SecondaryButton: React.FC<Props> = ({ title, ...rest }) => {
  return (
    <button className={style.secondaryButton} {...rest}>
      {title}
    </button>
  );
};
