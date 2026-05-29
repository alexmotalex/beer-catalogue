import type React from 'react';
import type { Beer } from '../../types/Beer';
import { Link } from 'react-router';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';
import styles from './ProductCard.module.scss';

type Props = {
  product: Beer;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const {
    name,
    price,
    image_url,
    alcohol_percentage,
    beer_type,
    volume,
    is_filtered,
  } = product;

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

  return (
    <article className={styles.productCard}>
      <Link to="/" className={styles.imgContent}>
        <img
          src={image_url}
          alt={name}
          className={styles.productImg}
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
        <PrimaryButton title="Add to cart" handleClick={() => {}} />
      </div>
    </article>
  );
};
