import styles from './PrimaryButton.module.scss';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
};

export const PrimaryButton: React.FC<Props> = ({ title, ...rest }) => {
  return (
    <button className={styles.primaryButton} {...rest}>
      {title}
    </button>
  );
};
