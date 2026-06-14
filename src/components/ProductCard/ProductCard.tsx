import type React from 'react';
import type { Beer } from '../../types/Beer';
import { Link } from 'react-router';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';
import styles from './ProductCard.module.scss';
import { buildProductPath } from '../../utils/buildProductPath ';
import { useCart } from '../../hooks/useCart';

type Props = {
  product: Omit<Beer, 'description'>;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    id,
    name,
    price,
    image_url,
    alcohol_percentage,
    beer_type,
    volume,
    is_filtered,
    is_available,
  } = product;

  const { addToCart, isInCart } = useCart();

  const productPath = buildProductPath(id);

  const handleAddToCart = () => {
    addToCart(id);
  };

  const inCart = isInCart(id);

  const productCharacteristics = [
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
      : `Add to basket | $${price}`;

  return (
    <article className={styles.productCard}>
      <Link to={productPath} className={styles.imageContent}>
        <img
          src={image_url}
          alt={name}
          className={styles.productImage}
          loading="lazy"
        />
      </Link>

      <div className={styles.productInfo}>
        <div className={styles.mainInfo}>
          <p className={styles.name}>{name}</p>
          <p className={styles.price}>{`$${price}`}</p>
        </div>

        <div className={styles.characteristics}>
          {productCharacteristics.map(c => (
            <span key={c.id} className={styles.characteristicsItem}>
              {c.spec}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.productCardButton}>
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
