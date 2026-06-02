import { useNavigate } from 'react-router';
import styles from './BackButton.module.scss';
import { Icon } from '../../Icon';

export const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <button type="button" onClick={handleGoBack} className={styles.backButton}>
      <Icon name="back-arrow" size={18} />
      Back
    </button>
  );
};
