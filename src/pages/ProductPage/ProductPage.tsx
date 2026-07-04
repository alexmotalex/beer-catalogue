import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { BackButton } from '../../components/Buttons/BackButton';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { ProductPageSkeleton } from '../../components/ProductPageSkeleton';
import { SlowServerMessage } from '../../components/SlowServerMessage';
import { Toast } from '../../components/Toast';
import { Spinner } from '../../components/Spinner';
import { ErrorInfo } from '../../components/ErrorInfo';
import { Dot } from '../../components/Dot';
import { useBeerById } from '../../hooks/useBeerById';
import { useAuth } from '../../hooks/useAuth';
import { useSlowLoad } from '../../hooks/useSlowLoad';
import { useCart } from '../../hooks/useCart';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';
import { formatOccasions } from '../../utils/formatOccasions';
import { resolvePublicUrl } from '../../utils/resolvePublicUrl';
import { ROUTES } from '../../constants/routes';
import clsx from 'clsx';
import placeholderBeer from '../../assets/images/beer-placeholder.webp';
import styles from './ProductPage.module.scss';

export const ProductPage = () => {
  const [toast, setToast] = useState<string | null>(null);
  const [toastIcon, setToastIcon] = useState('tick');
  const { productId } = useParams();
  const beerId = Number(productId);
  const { user } = useAuth();
  const {
    getQuantityInCart,
    addToCart,
    isInCart,
    itemErrors,
    isLoading: cartIsLoading,
  } = useCart();
  const { beer, isLoading: beerIsLoading } = useBeerById(beerId);
  const navigate = useNavigate();
  const isSlow = useSlowLoad(beerIsLoading);

  if (beerIsLoading) {
    return (
      <section className={styles.product}>
        <BackButton />
        {isSlow ? <SlowServerMessage /> : <ProductPageSkeleton />}
      </section>
    );
  }

  const inCart = isInCart(beerId);

  const imageSrc = beer?.image_url
    ? resolvePublicUrl(beer?.image_url)
    : placeholderBeer;
  const occasions = formatOccasions(beer?.event_type ?? []);

  const error = itemErrors.get(beerId);
  const itemsInCart = getQuantityInCart(beerId);

  const handleAddToCart = async () => {
    if (!user) {
      navigate(ROUTES.signIn);
      return;
    }

    setToast(null);

    if (beer?.id) {
      const error = await addToCart(beer.id);

      if (error) {
        setToastIcon('close');

        setToast(`Attention: ${error}`);
      } else {
        setToastIcon('tick');
        setToast(`${beer?.name} successfully added to cart.`);
      }
    }
  };

  const specifications = [
    {
      label: 'Type',
      value: capitalizeFirstLetter(beer?.beer_type),
    },
    {
      label: 'ABV',
      value: `${beer?.alcohol_percentage}%`,
    },
    {
      label: 'Filtering',
      value: beer?.is_filtered ? 'Filtered' : 'Unfiltered',
    },
    {
      label: 'Volume',
      value: `${beer?.volume}ml`,
    },
  ];

  const buttonTitle = !beer?.is_available
    ? 'Out of stock'
    : inCart
      ? `Add to cart | ${itemsInCart} ${itemsInCart === 1 ? 'item' : 'items'} added`
      : 'Add to cart';

  return (
    <section className={styles.product}>
      {toast && (
        <Toast title={toast} onClose={() => setToast(null)} icon={toastIcon} />
      )}

      <BackButton />

      <div className={styles.overall}>
        <div
          className={clsx(
            styles.imageContent,
            !beer?.is_available && styles.imageContentSoldOut,
          )}
        >
          <img
            src={imageSrc}
            alt={beer?.name}
            className={styles.productImage}
          />
        </div>

        <section className={styles.about}>
          <div className={styles.detail}>
            <div className={styles.info}>
              <span className={styles.barrel}>Old Barrel</span>
              <h1 className={styles.title}>{beer?.name}</h1>
              <p className={styles.price}>Price ${beer?.price}</p>
            </div>

            <div className={styles.description}>
              <p className={styles.descriptionText}>{beer?.description}</p>

              <ul className={styles.occasions}>
                {occasions?.map((item, index) => {
                  const isLastItem = index === occasions.length - 1;

                  return (
                    <li key={item} className={styles.occasionsItem}>
                      <span className={styles.occasionsText}>{item}</span>
                      {!isLastItem && <Dot />}
                    </li>
                  );
                })}
              </ul>
            </div>

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

            <div className={styles.addToBasket}>
              <PrimaryButton
                type="button"
                title={cartIsLoading ? 'Addiing to cart' : buttonTitle}
                onClick={handleAddToCart}
                disabled={!beer?.is_available || cartIsLoading}
                icon={
                  cartIsLoading ? <Spinner width={16} height={16} /> : undefined
                }
              />
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};
