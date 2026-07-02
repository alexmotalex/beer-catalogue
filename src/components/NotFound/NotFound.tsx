import { useNavigate } from 'react-router';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import styles from './NotFound.module.scss';
import { ROUTES } from '../../constants/routes';
import emptyCartLogo from '../../assets/images/empty-cart.png';

export const NotFound = () => {
  const navigate = useNavigate();

  const handleBrowseBeers = () => {
    navigate(ROUTES.catalogue);
  };

  return (
    <div className="pageContent">
      <div className={styles.notFound}>
        <div className={styles.notFoundImageContent}>
          <img
            className={styles.notFoundImage}
            src={emptyCartLogo}
            alt="Not found"
          />
        </div>

        <div className={styles.content}>
          <h3 className={styles.contentTitle}>Nothing here yet</h3>

          <p className={styles.contentText}>
            Your next favorite beer is waiting. Start exploring the catalog.
          </p>
        </div>

        <div className={styles.notFoundButton}>
          <PrimaryButton
            type="button"
            title="Browse beers"
            onClick={handleBrowseBeers}
          />
        </div>
      </div>
    </div>
  );
};
