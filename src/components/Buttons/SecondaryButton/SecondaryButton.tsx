import style from './SecondaryButton.module.scss';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
  icon?: React.ReactNode;
};

export const SecondaryButton: React.FC<Props> = ({ title, icon, ...rest }) => {
  return (
    <button className={style.secondaryButton} {...rest}>
      {title}
      {icon && icon}
    </button>
  );
};
