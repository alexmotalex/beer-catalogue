import { useNavigate, useSearchParams } from 'react-router';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import styles from './NotFound.module.scss';
import { ROUTES } from '../../constants/routes';
import type React from 'react';

type Props = {
  logo: string;
  title: string;
  subtitle: string;
  buttonTitle: string;
};

export const NotFound: React.FC<Props> = ({
  logo,
  title,
  subtitle,
  buttonTitle,
}) => {
  const navigate = useNavigate();
  const [, setSearchParams] = useSearchParams();

  const handleBrowseBeers = () => {
    setSearchParams({});
    navigate(ROUTES.catalogue);
  };

  return (
    <div className="pageContent">
      <div className={styles.notFound}>
        <div className={styles.notFoundImageContent}>
          <img className={styles.notFoundImage} src={logo} alt="Not found" />
        </div>

        <div className={styles.content}>
          <h3 className={styles.contentTitle}>{title}</h3>

          <p className={styles.contentText}>{subtitle}</p>
        </div>

        <div className={styles.notFoundButton}>
          <PrimaryButton
            type="button"
            title={buttonTitle}
            onClick={handleBrowseBeers}
          />
        </div>
      </div>
    </div>
  );
};
