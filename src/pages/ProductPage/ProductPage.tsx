// import styles from './Catalogue.module.scss';

import { useParams } from 'react-router';
import { BackButton } from '../../components/Buttons/BackButton';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { Stepper } from '../../components/Stepper';
import { useBeerById } from '../../hooks/useBeerById';
import clsx from 'clsx';
import styles from './ProductPage.module.scss';

export const ProductPage = () => {
  const { productId } = useParams();
  const beerId = Number(productId);

  const { beer, isLoading, isError } = useBeerById(beerId);

  if (isLoading) {
    return <h2>Loading</h2>;
  }

  if (isError) {
    return <h2>Error</h2>;
  }

  if (!beer) {
    return <h2>Not found</h2>;
  }

  const {
    image_url,
    name,
    price,
    description,
    beer_type,
    alcohol_percentage,
    is_filtered,
    volume,
    is_available,
  } = beer;

  const handleIncrease = () => {};
  const handleDecrease = () => {};
  const handleDelete = () => {};

  const specifications = [
    {
      label: 'Type',
      value: beer_type,
    },
    {
      label: 'ABV',
      value: `${alcohol_percentage}%`,
    },
    {
      label: 'Filtering',
      value: is_filtered ? 'Filtered' : 'Unfiltered',
    },
    {
      label: 'Volume',
      value: `${volume}ml`,
    },
  ];

  const buttonTitle = is_available
    ? `Add to basket | $${price}`
    : 'Out of stock';

  return (
    <div className={styles.product}>
      <BackButton />

      <div className={styles.productOverall}>
        <div
          className={clsx(
            styles.productImageContent,
            !is_available && styles.productImageContentSoldOut,
          )}
        >
          <img src={image_url} alt={name} className={styles.productImage} />
        </div>

        <section className={styles.productAbout}>
          <div className={styles.productDescription}>
            <div className={styles.productInfo}>
              <span className={styles.productBarrel}>Old Barrel</span>
              <h1 className={styles.productTitle}>{name}</h1>
              <p className={styles.productPrice}>Price ${price}</p>
            </div>

            <p className={styles.productDetail}>{description}</p>

            <div className={styles.productSpecifications}>
              <h2 className={styles.productSpecificationsTitle}>
                Specifications
              </h2>

              <div className={styles.productSpecificationsList}>
                {specifications.map(specification => (
                  <div
                    key={specification.label}
                    className={styles.productSpecificationsItem}
                  >
                    <span className={styles.productSpecificationsLabel}>
                      {specification.label}
                    </span>
                    <span className={styles.productSpecificationsValue}>
                      {specification.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.productButtons}>
            <Stepper
              value={1}
              onDecrease={handleDecrease}
              onIncrease={handleIncrease}
              onDelete={handleDelete}
            />

            <div className={styles.productButtonsAddToBasket}>
              <PrimaryButton
                title={buttonTitle}
                onClick={() => {}}
                disabled={!is_available}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
