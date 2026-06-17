// import styles from './Catalogue.module.scss';

import { useParams } from 'react-router';
import { BackButton } from '../../components/Buttons/BackButton';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { Stepper } from '../../components/Stepper';
import { useBeerById } from '../../hooks/useBeerById';
import clsx from 'clsx';
import styles from './ProductPage.module.scss';
import { useCart } from '../../hooks/useCart';
import { ErrorInfo } from '../../components/ErrorInfo';

export const ProductPage = () => {
  const { productId } = useParams();
  const beerId = Number(productId);

  const { beer, isLoading, isError } = useBeerById(beerId);
  const { addToCart, isInCart, itemErrors, cartItems, deleteFromCart } =
    useCart();

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

  const inCart = isInCart(beerId);
  const cartItem = cartItems.find(item => item.beer_id === beerId);
  const error = itemErrors.get(beerId);

  const handleIncrease = () => {
    addToCart(beerId);
  };

  const handleDecrease = () => {
    if (!cartItem) {
      return;
    }

    deleteFromCart(cartItem.id, beerId);
  };

  const handleAddToCart = () => {
    addToCart(beerId);
  };

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

  const buttonTitle = !is_available
    ? 'Out of stock'
    : inCart
      ? 'Added to cart'
      : `Add to basket | $${price}`;

  return (
    <section className={styles.product}>
      <BackButton />

      <div className={styles.overall}>
        <div
          className={clsx(
            styles.imageContent,
            !is_available && styles.imageContentSoldOut,
          )}
        >
          <img src={image_url} alt={name} className={styles.productImage} />
        </div>

        <section className={styles.about}>
          <div className={styles.description}>
            <div className={styles.info}>
              <span className={styles.barrel}>Old Barrel</span>
              <h1 className={styles.title}>{name}</h1>
              <p className={styles.price}>Price ${price}</p>
            </div>

            <p className={styles.detail}>{description}</p>

            <div className={styles.specifications}>
              <h2 className={styles.specificationsTitle}>Specifications</h2>

              <div className={styles.specificationsList}>
                {specifications.map(specification => (
                  <div
                    key={specification.label}
                    className={styles.specificationsItem}
                  >
                    <span className={styles.specificationsLabel}>
                      {specification.label}
                    </span>
                    <span className={styles.specificationsValue}>
                      {specification.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.buttons}>
            {error && (
              <div className={styles.error}>
                <ErrorInfo errorText={error} />
              </div>
            )}

            <Stepper
              value={cartItem?.quantity || 0}
              error={Boolean(error)}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
              onDelete={handleIncrease}
            />

            <div className={styles.addToBasket}>
              <PrimaryButton
                type="button"
                title={buttonTitle}
                onClick={handleAddToCart}
                disabled={!is_available || inCart}
              />
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};
