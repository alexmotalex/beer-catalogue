import { useNavigate } from 'react-router';
import styles from './BackButton.module.scss';

export const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <button type="button" onClick={handleGoBack} className={styles.backButton}>
      <span className={styles.backIcon} aria-hidden="true" />
      Back
    </button>
  );
};
