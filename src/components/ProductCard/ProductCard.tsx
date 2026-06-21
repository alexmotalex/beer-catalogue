import type React from 'react';
import { Link, useNavigate } from 'react-router';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { buildProductPath } from '../../utils/buildProductPath';
import { ROUTES } from '../../constants/routes';
import type { Beer } from '../../types/Beer';
import styles from './ProductCard.module.scss';
import placeholderBeer from '../../assets/images/beer-placeholder.webp';
import clsx from 'clsx';

type Props = {
  product: Omit<Beer, 'description'>;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    id,
    name,
    price,
    alcohol_percentage,
    beer_type,
    volume,
    is_filtered,
    is_available,
  } = product;

  const { user } = useAuth();
  const { addToCart, isInCart } = useCart();
  const navigate = useNavigate();
  const productPath = buildProductPath(id);

  const handleAddToCart = () => {
    if (!user) {
      navigate(ROUTES.signIn);

      return;
    }

    addToCart(id);
  };

  const inCart = isInCart(id);

  const specifications = [
    {
      id: 1,
      spec: capitalizeFirstLetter(beer_type),
    },
    {
      id: 2,
      spec: alcohol_percentage,
    },
    {
      id: 3,
      spec: is_filtered ? 'Filtered' : 'Unfiltered',
    },
    {
      id: 4,
      spec: volume,
    },
  ];

  const buttonTitle = !is_available
    ? 'Out of stock'
    : inCart
      ? 'Added to cart'
      : `Add to cart | $${price}`;

  return (
    <article className={styles.productCard}>
      <Link to={productPath} className={styles.imageContent}>
        <img
          src={placeholderBeer}
          alt={name}
          className={clsx(
            styles.productImage,
            !is_available && styles.unavailable,
          )}
          loading="lazy"
        />
      </Link>

      <div className={styles.productInfo}>
        <div className={styles.mainInfo}>
          <p className={styles.name}>{name}</p>
          <p className={styles.price}>{`$${price}`}</p>
        </div>

        <div className={styles.specifications}>
          {specifications.map(item => (
            <span key={item.id} className={styles.specificationsItem}>
              {item.spec}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.button}>
        <PrimaryButton
          type="button"
          title={buttonTitle}
          onClick={handleAddToCart}
          disabled={!is_available || inCart}
        />
      </div>
    </article>
  );
};
