import { useNavigate, useParams } from 'react-router';
import { BackButton } from '../../components/Buttons/BackButton';
import { PrimaryButton } from '../../components/Buttons/PrimaryButton';
import { ProductPageSkeleton } from '../../components/ProductPageSkeleton';
import { SlowServerMessage } from '../../components/SlowServerMessage';
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
  const { productId } = useParams();
  const beerId = Number(productId);
  const { user } = useAuth();
  const { getQuantityInCart, addToCart, isInCart, itemErrors } = useCart();
  const { beer, isError, isLoading: beerIsLoading } = useBeerById(beerId);
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

  if (isError) {
    return <h2>Failed to load beer.</h2>;
  }

  if (!beer) {
    return <h2>Beer not found.</h2>;
  }

  const {
    name,
    price,
    description,
    beer_type,
    alcohol_percentage,
    is_filtered,
    volume,
    is_available,
    image_url,
    event_type,
  } = beer;

  const inCart = isInCart(beerId);

  const imageSrc = image_url ? resolvePublicUrl(image_url) : placeholderBeer;
  const occasions = formatOccasions(event_type);

  const error = itemErrors.get(beerId);
  const itemsInCart = getQuantityInCart(beerId);

  const handleAddToCart = async () => {
    if (!user) {
      navigate(ROUTES.signIn);
      return;
    }

    await addToCart(beerId);
  };

  const specifications = [
    {
      label: 'Type',
      value: capitalizeFirstLetter(beer_type),
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
      ? `Add to cart | ${itemsInCart} ${itemsInCart === 1 ? 'item' : 'items'}`
      : 'Add to cart';

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
          <img src={imageSrc} alt={name} className={styles.productImage} />
        </div>

        <section className={styles.about}>
          <div className={styles.detail}>
            <div className={styles.info}>
              <span className={styles.barrel}>Old Barrel</span>
              <h1 className={styles.title}>{name}</h1>
              <p className={styles.price}>Price ${price}</p>
            </div>

            <div className={styles.description}>
              <p className={styles.descriptionText}>{description}</p>

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
                title={buttonTitle}
                onClick={handleAddToCart}
                disabled={!is_available}
              />
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};
