// import styles from './Catalogue.module.scss';

import { useParams } from 'react-router';
import { useBeerById } from '../../hooks/useBeerById';
import styles from './ProductPage.module.scss';
import { BackButton } from '../../components/Buttons/BackButton';

export const ProductPage = () => {
  const { productId } = useParams();

  const { beer, isLoading, isError } = useBeerById(Number(productId));

  if (isLoading) {
    return <h2>Loading</h2>;
  }

  if (isError) {
    return <h2>Error</h2>;
  }

  if (!beer) {
    return <h2>Not found</h2>;
  }

  const { image_url, name, price, description } = beer;

  return (
    <div className={styles.product}>
      <BackButton />

      <div className={styles.productOveral}>
        <div className={styles.productImageContent}>
          <img src={image_url} alt={name} className={styles.productImage} />
        </div>

        <section className={styles.productAbout}>
          <div className={styles.productDescription}>
            <div className={styles.productInfo}>
              <span className={styles.productBarrel}>Old Barrel</span>
              <h1 className={styles.productTitle}>{name}</h1>
              <h3 className={styles.productPrice}>Price ${price}</h3>
            </div>

            <p className={styles.productDetail}>{description}</p>

            <div className={styles.productSpecifications}>
              <h2 className={styles.productSpecificationsTitle}>
                Specifications
              </h2>
            </div>
          </div>

          <div className={styles.productButtons}></div>
        </section>
      </div>
    </div>
  );
};
