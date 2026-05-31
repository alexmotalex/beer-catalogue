// import styles from './Catalogue.module.scss';

import { useParams } from 'react-router';
import { BackButton } from '../../components/Buttons/BackButton';
import { QuantityButton } from '../../components/Buttons/QuantityButton';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { useBeerById } from '../../hooks/useBeerById';
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
  } = beer;

  const beerSpecifications = [
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

  return (
    <div className={styles.product}>
      <BackButton />

      <div className={styles.productOverall}>
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

              <div className={styles.productSpecificationsList}>
                {beerSpecifications.map(item => (
                  <div
                    key={item.label}
                    className={styles.productSpecificationsItem}
                  >
                    <span className={styles.productSpecificationsLabel}>
                      {item.label}
                    </span>
                    <span className={styles.productSpecificationsValue}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.productButtons}>
            <div className={styles.productButtonsQtyContainer}>
              <div className={styles.productButtonsQtyItem}>
                <QuantityButton
                  iconPath="./icons/minus-icon.svg"
                  onClick={() => {}}
                  ariaLabel="Decrease quantity"
                />
              </div>
              <div className={styles.productButtonsQtyItem}>1</div>
              <div className={styles.productButtonsQtyItem}>
                <QuantityButton
                  iconPath="./icons/plus-icon.svg"
                  onClick={() => {}}
                  ariaLabel="Increase quantity"
                />
              </div>
            </div>

            <div className={styles.productButtonsAddToBasket}>
              <PrimaryButton
                title={`Add to basket  |  $${price}`}
                onClick={() => {}}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
