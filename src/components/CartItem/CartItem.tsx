import { Link } from 'react-router';
import { Stepper } from '../Stepper';
import { ErrorInfo } from '../ErrorInfo';
import { buildProductPath } from '../../utils/buildProductPath';
import { useCart } from '../../hooks/useCart';
import { resolvePublicUrl } from '../../utils/resolvePublicUrl';
import placeholderBeer from '../../assets/images/beer-placeholder.webp';
import type { CartEntry } from '../../types/Cart';
import styles from './CartItem.module.scss';
import { useState } from 'react';

type Props = {
  cartItem: CartEntry;
};

export const CartItem: React.FC<Props> = ({ cartItem }) => {
  const { updateCartItemQuantity, deleteFromCart, itemErrors } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const { id, beer_id, quantity, name, price, image_url } = cartItem;
  const error = itemErrors.get(beer_id);

  const imageSrc = image_url ? resolvePublicUrl(image_url) : placeholderBeer;
  const totalItemPrice = Number(price) * quantity;
  const displayedPrice = `$${totalItemPrice.toFixed(2)}`;

  const handleIncrease = async () => {
    setIsAdding(true);

    await updateCartItemQuantity(id, beer_id, quantity + 1);

    setIsAdding(false);
  };

  const handleDecrease = async () => {
    setIsAdding(true);

    if (quantity <= 1) {
      await deleteFromCart(id, beer_id);

      setIsAdding(false);

      return;
    }

    await updateCartItemQuantity(id, beer_id, quantity - 1);
    setIsAdding(false);
  };

  const handleDelete = async () => {
    setIsAdding(true);

    await deleteFromCart(id, beer_id);

    setIsAdding(false);
  };

  const handleManualChange = async (newQuantity: number) => {
    setIsAdding(true);

    await updateCartItemQuantity(id, beer_id, newQuantity);

    setIsAdding(false);
  };

  const productPath = buildProductPath(beer_id);

  return (
    <article className={styles.cartItem}>
      <Link to={productPath} className={styles.imageLink}>
        <img
          src={imageSrc}
          className={styles.productImage}
          alt={name}
          loading="lazy"
        />
      </Link>

      <div className={styles.info}>
        <div className={styles.product}>
          <div className={styles.header}>
            <p className={styles.name}>{name}</p>

            <p className={styles.price}>{displayedPrice}</p>
          </div>

          <span className={styles.volume}>500ml</span>
        </div>

        {error && <ErrorInfo errorText={error} />}

        <Stepper
          value={quantity}
          error={Boolean(error)}
          isLoading={isAdding}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          onDelete={handleDelete}
          onChange={handleManualChange}
        />
      </div>
    </article>
  );
};
