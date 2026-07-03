import styles from './PrimaryButton.module.scss';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
  icon?: React.ReactNode;
};

export const PrimaryButton: React.FC<Props> = ({ title, icon, ...rest }) => {
  return (
    <button className={styles.primaryButton} {...rest}>
      {title}
      {icon && icon}
    </button>
  );
};
