import type React from 'react';
import { Link, useNavigate } from 'react-router';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { useCart } from '../../hooks/useCart';
import { useAuth } from '../../hooks/useAuth';
import { resolvePublicUrl } from '../../utils/resolvePublicUrl';
import { buildProductPath } from '../../utils/buildProductPath';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';
import { ROUTES } from '../../constants/routes';
import type { Beer } from '../../types/Beer';
import clsx from 'clsx';
import styles from './ProductCard.module.scss';
import placeholderBeer from '../../assets/images/beer-placeholder.webp';
import { useState } from 'react';
import { Spinner } from '../Spinner';

type Props = {
  product: Omit<Beer, 'description'>;
  setToast?: (message: string | null) => void;
  setToastIcon?: (icon: string) => void;
};

export const ProductCard: React.FC<Props> = ({
  product,
  setToast = () => {},
  setToastIcon = () => {},
}) => {
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
  const [isAdding, setIsAdding] = useState(false);

  const { user } = useAuth();
  const { addToCart, getQuantityInCart, isInCart } = useCart();
  const navigate = useNavigate();
  const productPath = buildProductPath(id);
  const imageSrc = image_url ? resolvePublicUrl(image_url) : placeholderBeer;

  const handleAddToCart = async () => {
    if (!user) {
      navigate(ROUTES.signIn);

      return;
    }

    setToast(null);
    setIsAdding(true);

    const error = await addToCart(id);

    if (error) {
      setToastIcon('close');

      setToast(`Attention: ${error}`);
    } else {
      setToastIcon('tick');
      setToast(`${name} successfully added to cart.`);
    }

    setIsAdding(false);
  };

  const inCart = isInCart(id);
  const itemsInCart = getQuantityInCart(id);

  const specifications = [
    {
      id: 1,
      spec: capitalizeFirstLetter(beer_type),
    },
    {
      id: 2,
      spec: `${alcohol_percentage}%`,
    },
    {
      id: 3,
      spec: is_filtered ? 'Filtered' : 'Unfiltered',
    },
    {
      id: 4,
      spec: `${volume} ml`,
    },
  ];

  const buttonTitle = !is_available
    ? 'Out of stock'
    : inCart
      ? `Add to cart | ${itemsInCart} ${itemsInCart === 1 ? 'item' : 'items'} added`
      : 'Add to cart';

  return (
    <article className={styles.productCard}>
      <Link to={productPath} className={styles.imageContent}>
        <img
          src={imageSrc}
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
          title={isAdding ? 'Adding to cart ' : buttonTitle}
          onClick={handleAddToCart}
          disabled={!is_available || isAdding}
          icon={isAdding ? <Spinner width={16} height={16} /> : undefined}
        />
      </div>
    </article>
  );
};
